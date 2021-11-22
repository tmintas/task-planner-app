import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

import * as fromRouterActions from '@actions/router';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromTodoActions from '@actions/todo';

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
	
	onLoadTodosAll$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadTodosAll),
		switchMap(() => this.todoService.GetUserTodos()),
		mergeMap((items) => {
			return [
				fromTodoActions.LoadTodosAllSuccess({ items }),
				fromTodoActions.UpdateTodosVisibility(),
			];
		}),
		catchError(err => of(fromTodoActions.LoadTodosAllFail({ err })))
	));

	onCreateTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodo),
		mergeMap((action) => this.todoService.CreateTodo(action.item)),
		switchMap(newItem => [
			fromTodoActions.CreateTodoSuccess({ item : newItem }),
			fromTodoActions.UpdateTodosVisibility(),
		]),
		catchError(err => of(fromTodoActions.CreateTodoFail({ err })))
	));

	onUpdateTodo = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodo),
		switchMap((action) => combineLatest([
			this.todoService.UpdateTodo(+action.item.id, action.item.changes),
			of(action.item)
		])),
		map(([_, todoUpdate]) => {
			return fromTodoActions.UpdateTodoSuccess({ item : todoUpdate });
		}),
		catchError(err => of(fromTodoActions.UpdateTodoFail({ err })))
		)
	);

	onCreateTodoSuccess = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodoSuccess),
		switchMap((payload) => { 
			return of(fromRouterActions.Go({ path : [ 'calendar', payload.item.Date.getFullYear(), payload.item.Date.getMonth() + 1, payload.item.Date.getDate() ]}))
		})
	));

	onUpdateTodoSuccess = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodoSuccess),
		switchMap((payload : { item : Update<Todo> }) => { 
			const itemDate = payload.item.changes.Date;
			return of(fromRouterActions.Go({ path : [ 'calendar', itemDate.getFullYear(), itemDate.getMonth() + 1, itemDate.getDate() ]}))
		})
	));

	onLoadImportanceOptions = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadImportanceOptions),
		mergeMap(() => {
			return of(this.todoService.GetImportanceOptions()).pipe(
				map(options => fromTodoActions.LoadImportanceOptionsSuccess({ options })),
			);
		})
	));

	onDeleteTodoStart = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.DeleteTodo),
		mergeMap((action) => {
			return this.todoService.DeleteTodo(action.id).pipe(
				switchMap(() => [
					fromTodoActions.DeleteTodoSuccess({ id: action.id }),
					fromTodoActions.UpdateTodosVisibility(),
				]),
				catchError(err => of(fromTodoActions.DeleteTodoFail({ err })))
			);
		})
	));

	onSubmitTodo = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.SubmitTodo),
		withLatestFrom(this.store.select(fromCalendarSelectors.selectedTodo)),
		map(([action, item]) => {
			if (!item) {
				return fromTodoActions.CreateTodo({ item : action.item });
			} else {
				const updatedItem : Update<Todo> = {
					id : item.id,
					changes : action.item
				}
				
				return fromTodoActions.UpdateTodo({ item : updatedItem });
			}
		})
	));

	onToggleDone = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.ToggleDone),
		mergeMap((payload) => this.todoService.ToggleDone(payload.id).pipe(
			map(() => fromTodoActions.ToggleDoneSuccess()),
			catchError((err) => of(fromTodoActions.ToggleDoneFail({ err  }))
		)))
	));

	onTodoActionFail = createEffect(() => this.actions$.pipe(
		ofType(
			fromTodoActions.LoadTodosAllFail, 
			fromTodoActions.DeleteTodoFail,
			fromTodoActions.UpdateTodoFail,
			fromTodoActions.CreateTodoFail),
		tap((action) => this.errorService.handleError(new HandledError(action.err, action.type)))
	), { dispatch : false });
	
	onUpdateTodosVisibility = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodosVisibility),
		withLatestFrom(this.store.select(fromTodoSelectors.selectAllTodos)),
		map(([_, items]) => {
			const modifiedItems = this.todoService.setInvisibleForOverflowingItems([...items]);

			return fromTodoActions.LoadTodosAllSuccess({ items: modifiedItems });
		})
	))
}
