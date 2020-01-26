import { createAction, props } from '@ngrx/store';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

export const enum TodoActionTypes {
	ADD = '[Todo] Add',
	LOAD_MONTH = '[Todo] LoadMonth',
	LOAD_MONTH_SUCCESS = '[Todo] LoadMonthSuccess',
	LOAD_MONTH_FAIL = '[Todo] LoadMonthFail',
	DELETE_TODO = '[Todo] DeleteTodo',
	DELETE_TODO_SUCCESS = '[Todo] DeleteTodoSuccess',
	DELETE_TODO_FAIL = '[Todo] DeleteTodoFail',
	LOAD_DAY = '[Todo] LoadMonth',
	LOAD_DAY_SUCCESS = '[Todo] LoadMonthSuccess',
	LOAD_DAY_FAIL = '[Todo] LoadMonthFail',
	LOAD_TODO = '[Todo] LoadTodo',
	LOAD_TODO_SUCCESS = '[Todo] LoadTodoSuccess',
	LOAD_TODO_FAIL = '[Todo] LLoadTodoFail',
	CREATE_TODO_SUCCESS = '[Todo] CreateMonthSuccess',
	CREATE_TODO_FAIL = '[Todo] CreateMonthFail',
	CREATE_TODO = '[Todo] CreateTodo',

	UPDATE_TODO_SUCCESS = '[Todo] LoadMonthSuccess',
	UPDATE_TODO_FAIL = '[Todo] LoadMonthFail',
	UPDATE_TODO = '[Todo] UpdateTodo'
}

export const CreateTodo = createAction(TodoActionTypes.CREATE_TODO , props<{ item : ToDoItem }>());
export const CreateTodoSuccess = createAction(TodoActionTypes.CREATE_TODO_SUCCESS , props<{ item : ToDoItem }>());
export const CreateTodoFail = createAction(TodoActionTypes.CREATE_TODO_FAIL , props<{ err : any }>());

export const DeleteTodo = createAction(TodoActionTypes.DELETE_TODO, props<{ id : number }>());
export const DeleteTodoSuccess = createAction(TodoActionTypes.DELETE_TODO_SUCCESS , props<{ id : number }>());
export const DeleteTodoFail = createAction(TodoActionTypes.DELETE_TODO_FAIL , props<{ err : any }>());

export const LoadTodo = createAction(TodoActionTypes.LOAD_TODO);
export const LoadTodoSuccess = createAction(TodoActionTypes.LOAD_TODO_SUCCESS, props<{ item : ToDoItem }>());
export const LoadTodoFail = createAction(TodoActionTypes.LOAD_TODO_FAIL, props<{ err : any }>());

export const LoadMonthTodos = createAction(TodoActionTypes.LOAD_MONTH);
export const LoadMonthTodosSuccess = createAction(TodoActionTypes.LOAD_MONTH_SUCCESS, props<{ items : ToDoItem[] }>());
export const LoadMonthTodosFail = createAction(TodoActionTypes.LOAD_MONTH_FAIL, props<{ err : any }>());

export const LoadDayTodos = createAction(TodoActionTypes.LOAD_DAY);
export const LoadDayTodosSuccess = createAction(TodoActionTypes.LOAD_DAY_SUCCESS, props<{ items : ToDoItem[] }>());
export const LoadDayTodosFail = createAction(TodoActionTypes.LOAD_DAY_FAIL, props<{ err : any }>());

export const UpdateTodo = createAction(TodoActionTypes.UPDATE_TODO, props<{ item : ToDoItem}>());
export const UpdateTodoSuccess = createAction(TodoActionTypes.UPDATE_TODO_SUCCESS, props<{ updatedItem : ToDoItem }>());
export const UpdateTodoFail = createAction(TodoActionTypes.UPDATE_TODO_FAIL, props<{ err : any }>());
