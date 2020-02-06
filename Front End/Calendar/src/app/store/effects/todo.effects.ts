import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TodoService } from 'app/to-dos/services/todo-service.service';

import * as fromTodoActions from '@actions/todo';

@Injectable()
export class TodoEffect {
	constructor(
		private actions$ : Actions,
		private todoService : TodoService,
	) { }

	// public LoadTodosMonth$ = createEffect(() => this.actions$.pipe(
	// 	ofType(fromTodoActions.LoadTodosMonth),
	// 	mergeMap(() => {
	// 		return this.todoService.GetMonthTodos().pipe(
	// 			map(todos => fromTodoActions.LoadTodosMonthSuccess({ items : todos })),
	// 			catchError(err => of(fromTodoActions.LoadTodosMonthFail({ err })))
	// 		);
	// 	})
	// ));

	// public LoadTodosDay$ = createEffect(() => this.actions$.pipe(
	// 	ofType(fromTodoActions.LoadTodosDay),
	// 	mergeMap(() => {
	// 		return this.todoService.GetDayTodos().pipe(
	// 			map(todos => fromTodoActions.LoadTodosDaySuccess({ items : todos })),
	// 			catchError(err => of(fromTodoActions.LoadTodosDayFail({ err })))
	// 		);
	// 	})
	// ));

	// public LoadTodo$ = createEffect(() => this.actions$.pipe(
	// 	ofType(fromTodoActions.LoadTodo),
	// 	mergeMap((action) => {
	// 		return this.todoService.GetById(action.id).pipe(
	// 			map(todo => fromTodoActions.LoadTodoSuccess({ item : todo })),
	// 			catchError(err => of(fromTodoActions.LoadTodoFail({ err })))
	// 		);
	// 	})
	// ));

	public LoadTodosAll$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadTodosAll),
		mergeMap(() => {
			return this.todoService.GetAll().pipe(
				map(items => fromTodoActions.LoadTodosAllSuccess({items})),
				catchError(err => of(fromTodoActions.CreateTodoFail({ err })))
			);
		})
	));

	public CreateTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodo),
		mergeMap((item) => {
			return this.todoService.CreateTodo(item).pipe(
				map(newItem => fromTodoActions.CreateTodoSuccess({ item : newItem })),
				catchError(err => of(fromTodoActions.CreateTodoFail({ err })))
			);
		})
	));

	public UpdateTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodo),
		mergeMap((action) => {
			return this.todoService.CreateTodo(action.item).pipe(
				map(updatedItem => fromTodoActions.UpdateTodoSuccess({ id: action.id, updatedItem : action.item })),
				catchError(err => of(fromTodoActions.UpdateTodoFail({ err })))
			);
		})
	));

	// public DeleteTodo$ = createEffect(() => this.actions$.pipe(
	// 	ofType(fromTodoActions.DeleteTodo),
	// 	mergeMap((action) => {
	// 		return this.todoService.DeleteTodo(action.id).pipe(
	// 			map(() => fromTodoActions.DeleteTodoSuccess({ id : action.id })),
	// 			catchError(err => of(fromTodoActions.DeleteTodoFail({ err })))
	// 		);
	// 	})
	// ));
}
