import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TodoService } from 'app/to-dos/services/todo-service.service';

import * as fromTodoActions from '@actions/todo';
import { ToDoItem } from '@todo-models';

@Injectable()
export class TodoEffect {
	constructor(
		private actions$ : Actions,
		private todoService : TodoService,
	) { }

	public loadMonthTodos$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.TodoActionTypes.LOAD_MONTH),
		mergeMap(() => {
			return this.todoService.GetMonthTodos().pipe(
				map(todos => fromTodoActions.LoadMonthTodosSuccess({ items : todos })),
				catchError(err => of(fromTodoActions.LoadMonthTodosFail({ err })))
			);
		})
	));

	public addTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodo),
		map((action) => action.item),
		mergeMap((item : ToDoItem) => {
			return this.todoService.CreateTodo(item).pipe(
				map(newItem => fromTodoActions.CreateTodoSuccess({ item : newItem })),
				catchError(err => of(fromTodoActions.CreateTodoFail({ err })))
			);
		})
	));

	public updateTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodo),
		map((action) => action.item),
		mergeMap((item : ToDoItem) => {
			return this.todoService.CreateTodo(item).pipe(
				map(updatedItem => fromTodoActions.UpdateTodoSuccess({ updatedItem : updatedItem })),
				catchError(err => of(fromTodoActions.UpdateTodoFail({ err })))
			);
		})
	));

	public deleteTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.DeleteTodo),
		map((action) => action.id),
		mergeMap((id : number) => {
			return this.todoService.DeleteTodo(id).pipe(
				map(() => fromTodoActions.DeleteTodoSuccess({ id : id })),
				catchError(err => of(fromTodoActions.DeleteTodoFail({ err })))
			);
		})
	));
}
