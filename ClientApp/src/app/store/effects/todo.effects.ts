import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromTodoActions from '@actions/todo';
import {
	DeleteTodoSuccess,
	LoadImportanceOptionsSuccess,
	ResetSelectedTodo,
	SelectItemForEdit,
	UpdateTodosVisibility
} from '@actions/todo';

import AppState from '@states/app';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { TodoService } from 'app/to-dos/services/todo.service';
import { ErrorService } from 'app/core/services/error-service.service';

import { Todo } from '@todo-models';
import { HandledError } from 'app/shared/models/handled-error.model';
import { SelectDayToView } from "@actions/calendar";
import * as fromRouterActions from "@actions/router";

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
				fromTodoActions.SetItems({ items }),
				fromTodoActions.UpdateTodosVisibility(),
			];
		}),
		catchError(err => of(fromTodoActions.LoadTodosAllFail({ err })))
	));

	onCreateTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodo),
		mergeMap((action) => this.todoService.CreateTodo(action.item)),
		switchMap(newItem => [
			fromTodoActions.CreateTodoSuccess({ item: newItem }),
			fromTodoActions.UpdateTodosVisibility(),
		]),
		catchError(err => of(fromTodoActions.CreateTodoFail({ err })))
	));

	onUpdateTodo$ = createEffect(() => this.actions$.pipe(
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

	onCreateTodoSuccess$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.CreateTodoSuccess),
		map((payload) => {
			return SelectDayToView({ date: payload.item.Date });
		})
	));

	onUpdateTodoSuccess$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodoSuccess),
		map((payload : { item : Update<Todo> }) => { 
			return SelectDayToView({ date: payload.item.changes.Date });
		})
	));
	
	onLoadImportanceOptions = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.LoadImportanceOptions),
		mergeMap(() => {
			return this.todoService.GetImportanceOptions();
		}),
		map((options) => {
			return LoadImportanceOptionsSuccess({ options });
		})
	));

	onDeleteTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.DeleteTodo),
		switchMap((action, itemTodDelete) => {
			 return combineLatest([this.todoService.DeleteTodo(action.id), of(action.id)]);
		}),
		switchMap(([_, id]) => {
			return [
				DeleteTodoSuccess({ id }),
				UpdateTodosVisibility(),
				ResetSelectedTodo(),
			];
		}),
		catchError(err => of(fromTodoActions.DeleteTodoFail({ err })))
	));

	onSubmitTodo$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.SubmitTodo),
		withLatestFrom(this.store.select(fromTodoSelectors.selectedTodo)),
		map(([action, selectedItem]) => {
			if (!selectedItem) {
				return fromTodoActions.CreateTodo({ item : action.item });
			} else {
				const updatedItem : Update<Todo> = {
					id : selectedItem.id,
					changes : action.item
				}
				
				return fromTodoActions.UpdateTodo({ item : updatedItem });
			}
		})
	));

	onToggleDone$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.ToggleDone),
		switchMap((payload) => combineLatest([
			this.todoService.ToggleDone(payload.id),
			of(payload.id)
		])),
		map(([_, id]) => fromTodoActions.ToggleDoneSuccess({ id })),
		catchError((err) => of(fromTodoActions.ToggleDoneFail({ err })))
	));

	onTodoActionFail$ = createEffect(() => this.actions$.pipe(
		ofType(
			fromTodoActions.LoadTodosAllFail, 
			fromTodoActions.DeleteTodoFail,
			fromTodoActions.UpdateTodoFail,
			fromTodoActions.CreateTodoFail,
			fromTodoActions.ToggleDoneFail,
		),
		tap((action) => this.errorService.handleError(new HandledError(action.err, action.type)))
	), { dispatch : false });
	
	onUpdateTodosVisibility$ = createEffect(() => this.actions$.pipe(
		ofType(fromTodoActions.UpdateTodosVisibility),
		withLatestFrom(this.store.select(fromTodoSelectors.selectAllTodos)),
		map(([_, items]) => {
			// const modifiedItems = this.todoService.SetInvisibleForOverflowingItems(items);

			return fromTodoActions.SetItems({ items });
		})
	))

	onItemSelect$ = createEffect(() => this.actions$.pipe(
		ofType(SelectItemForEdit), map((payload) => {
			return fromRouterActions.Go({
				path: [
					'calendar',
					payload.item.Date.getFullYear(),
					payload.item.Date.getMonth() + 1,
					payload.item.Date.getDate(),
					'edit',
					payload.item.id
				]
			})
		})
	));
}
