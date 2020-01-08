import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TodoService } from 'app/to-dos/services/todo-service.service';

import * as fromTodoActions from '@actions/todo';

@Injectable()
export class TodoEffect {
    constructor(
        private actions$: Actions,
        private todoService: TodoService,
    ) { }

    loadMonthTodos$ = createEffect(() => this.actions$.pipe(
        ofType(fromTodoActions.TodoActionTypes.LOAD_MONTH),
        mergeMap(() => {
            return this.todoService.getMonthTodos().pipe(
                map(todos => fromTodoActions.LoadMonthTodosSuccess({ items : todos })),
                catchError(err => of(fromTodoActions.LoadMonthTodosFail({ err })))
            );
        })
    ));
}