import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoService } from 'app/to-dos/services/todo.service';
import * as fromRouterSelectors from '@selectors/router';

import * as fromTodoActions from '@actions/todo';
import * as fromTodoSelectors from '@selectors/todo';
import { Todo } from '@todo-models';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import { Update } from '@ngrx/entity';
import { NotificationService } from 'app/shared/services/notification.service';
import { GetMonthName } from '@shared-functions/date';

@Injectable()
export class TodoEffect {
	constructor(
		private actions$ : Actions,
		private todoService : TodoService,
		private notificationService : NotificationService,
		private store : Store<AppState>
	) { }

	public LoadTodosAll$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadTodosAll),
		mergeMap(() => {
			return this.todoService.GetAll().pipe(
				map((items : Todo[]) => fromTodoActions.LoadTodosAllSuccess({items})),
				catchError(err => of(fromTodoActions.LoadTodosAllFail({ err })))
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

	// public NavigateOnCreateOrUpdateSuccess$ = createEffect(() => this.actions$.pipe(
	// 	ofType(fromTodoActions.CreateTodoSuccess, fromTodoActions.UpdateTodoSuccess),
	// 	withLatestFrom(this.store.select(fromCalendarSelectors.featureSelector)),
	// 	switchMap([payload, state]) => { 
	// 		return of(fromRouterActions.go({ path : [ 'calendar', state.selectedYear, state.selectedDau ]}))
	// 	})
	// ));

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
		withLatestFrom(this.store.select(fromTodoSelectors.getSelectedTodoId)),
		map(([action, selectedItemId]) => {
			if (selectedItemId === 0) {
				return fromTodoActions.CreateTodo({ item : action.item });
			} else {
				const todoUpdate : Update<Todo> = {
					id : selectedItemId,
					changes : action.item
				}
				return fromTodoActions.UpdateTodo({ item : todoUpdate });
			}
		})
	));

	public ShowAlertAfterLoadAllFail$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadTodosAllFail),
		withLatestFrom(this.store.select(fromRouterSelectors.selectState)),
		tap(([payload, state]) => this.notificationService.AddError(`Error while loading items for ${GetMonthName(state.params.month)}`, payload.err.message))
	), { dispatch : false });

	public ShowAlertAfterDeleteFail$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.DeleteTodoFail),
		tap((payload) => this.notificationService.AddError(`Error while deleting an item`, payload.err.message))
	), { dispatch : false });

	public ShowAlertAfterUpdateFail$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodoFail),
		tap((payload) => this.notificationService.AddError(`Error while updating an item`, payload.err.message))
	), { dispatch : false });

	public ShowAlertAfterCreateFail$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodoFail),
		tap((payload) => this.notificationService.AddError(`Error while creating an item`, payload.err.message))
	), { dispatch : false });


}
