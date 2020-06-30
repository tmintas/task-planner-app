import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromRouterActions from '@actions/router';
import * as fromTodoActions from '@actions/todo';
import * as fromCalendarSelectors from '@selectors/calendar';
import AppState from '@states/app';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { TodoService } from 'app/to-dos/services/todo.service';
import { ErrorService } from 'app/core/services/error-service.service';

import { Todo } from '@todo-models';
import { HandledError } from 'app/shared/models/handled-error.model';

@Injectable()
export class TodoEffect {
	constructor(
		private actions$ : Actions,
		private todoService : TodoService,
		private errorService : ErrorService,
		private store : Store<AppState>
	) { }

	public LoadTodosAll$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadTodosAll),
		tap(console.log),
		mergeMap(() => {			
			return this.todoService.GetAll().pipe(
				map((items : Todo[]) => fromTodoActions.LoadTodosAllSuccess({items})),
				catchError(err => {
					return of(fromTodoActions.LoadTodosAllFail({ err }));
				})
			);
		})
	));

	public CreateTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodo),
		mergeMap((action) => {
			return this.todoService.CreateTodo(action.item).pipe(
				map(newItem => fromTodoActions.CreateTodoSuccess({ item : newItem })),
				catchError(err => of(fromTodoActions.CreateTodoFail({ err })))
			);
		})
	));

	public UpdateTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodo),
		mergeMap((action) => {
			
			return this.todoService.Update(+action.item.id, action.item.changes).pipe(
				map(() => {
					const todoUpdate : Update<Todo> = {
						id : +action.item.id,
						changes : action.item.changes
					};
					
					return fromTodoActions.UpdateTodoSuccess({ item : todoUpdate });
				}),
				catchError(err => of(fromTodoActions.UpdateTodoFail({ err })))
			);
		})
	));

	public NavigateOnCreateSuccess$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodoSuccess),
		switchMap((payload) => { 
			return of(fromRouterActions.Go({ path : [ 'calendar', payload.item.Date.getFullYear(), payload.item.Date.getMonth() + 1, payload.item.Date.getDate() ]}))
		})
	));

	public NavigateOnUpdateSuccess$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodoSuccess),
		switchMap((payload : { item : Update<Todo> }) => { 
			const itemDate = payload.item.changes.Date;
			return of(fromRouterActions.Go({ path : [ 'calendar', itemDate.getFullYear(), itemDate.getMonth() + 1, itemDate.getDate() ]}))
		})
	));

	public LoadOptions$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadImportanceOptions),
		mergeMap(() => {
			return of(this.todoService.GetImportanceOptions()).pipe(
				map(options => fromTodoActions.LoadImportanceOptionsSuccess({ options })),
			);
		})
	));

	public DeleteTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.DeleteTodoStart),
		mergeMap((action) => {
			return this.todoService.DeleteTodo(action.id).pipe(
				map(() => fromTodoActions.DeleteTodoSuccess({ id: action.id })),
				catchError(err => of(fromTodoActions.DeleteTodoFail({ err })))
			);
		})
	));

	public SubmitTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.SubmitTodo),
		withLatestFrom(this.store.select(fromCalendarSelectors.selectedTodo)),
		map(([action, item]) => {
			if (!item) {
				return fromTodoActions.CreateTodo({ item : action.item });
			} else {
				const todoUpdate : Update<Todo> = {
					id : item.id,
					changes : action.item
				}
				return fromTodoActions.UpdateTodo({ item : todoUpdate });
			}
		})
	));

	public ToggleDone = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.ToggleDone),
		mergeMap((payload) => this.todoService.ToggleDone(payload.id).pipe(
			map(() => fromTodoActions.ToggleDoneSuccess()),
			catchError((err) => of(fromTodoActions.ToggleDoneFail({ err  }))
		)))
	));

	public ShowAlertAfterFail$ = createEffect(() => this.actions$.pipe(
		ofType(
			fromTodoActions.LoadTodosAllFail, 
			fromTodoActions.DeleteTodoFail,
			fromTodoActions.UpdateTodoFail,
			fromTodoActions.CreateTodoFail),
		tap((action) => this.errorService.handleError(new HandledError(action.err, action.type)))
	), { dispatch : false });
}
