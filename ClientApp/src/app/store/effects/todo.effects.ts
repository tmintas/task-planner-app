import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { TodoService } from 'app/to-dos/services/todo.service';

import * as fromRouterActions from '@actions/router';
import * as fromTodoActions from '@actions/todo';
import * as fromTodoSelectors from '@selectors/todo';
import { ToDoItem } from '@todo-models';
import { Store } from '@ngrx/store';
import AppState from '@states/app';

@Injectable()
export class TodoEffect {
	constructor(
		private actions$ : Actions,
		private todoService : TodoService,
		private store : Store<AppState>
	) { }

	public LoadTodosAll$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadTodosAll),
		mergeMap(() => {
			return this.todoService.GetAll().pipe(
				map((items : ToDoItem[]) => {
					return fromTodoActions.LoadTodosAllSuccess({items});
				}),
				catchError(err => of(fromTodoActions.CreateTodoFail({ err })))
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
			return this.todoService.Update(action.id, action.item).pipe(
				map(() => fromTodoActions.UpdateTodoSuccess({ item : action.item })),
				catchError(err => of(fromTodoActions.UpdateTodoFail({ err })))
			);
		})
	));

	public NavigateOnCreateOrUpdateSuccess$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodoSuccess, fromTodoActions.UpdateTodoSuccess),
		switchMap((action) => { 
			return of(
				fromRouterActions.go({ path : [ 'calendar', action.item.Date.year, action.item.Date.month, action.item.Date.day ]}),
				fromTodoActions.LoadTodosAll())
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
		withLatestFrom(this.store.select(fromTodoSelectors.getSelectedTodoId)),
		map(([action, selectedItemId]) => {
			if (selectedItemId === 0) {
				return fromTodoActions.CreateTodo({ item : action.item });
			} else {
				return fromTodoActions.UpdateTodo({ id : selectedItemId, item : action.item });
			}
		})
	));
}
