import { createAction, props } from '@ngrx/store';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { TodoItemDto } from 'app/to-dos/models/to-do-item-dto.model';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';

export const enum TodoActionTypes {
	LOAD_TODOS_ALL = '[Todo] LoadAll',
	LOAD_TODOS_ALL_SUCCESS = '[Todo] LoadAllSuccess',
	LOAD_TODOS_ALL_FAIL = '[Todo] LoadAllFail',

	LOAD_TODOS_MONTH = '[Todo] LoadMonth',
	LOAD_TODOS_MONTH_SUCCESS = '[Todo] LoadMonthSuccess',
	LOAD_TODOS_MONTH_FAIL = '[Todo] LoadMonthFail',
	LOAD_TODOS_DAY = '[Todo] LoadMonth',
	LOAD_TODOS_DAY_SUCCESS = '[Todo] LoadMonthSuccess',
	LOAD_TODOS_DAY_FAIL = '[Todo] LoadMonthFail',
	LOAD_TODO = '[Todo] LoadTodo',
	LOAD_TODO_SUCCESS = '[Todo] LoadTodoSuccess',
	LOAD_TODO_FAIL = '[Todo] LLoadTodoFail',
	DELETE_TODO = '[Todo] DeleteTodo',
	DELETE_TODO_SUCCESS = '[Todo] DeleteTodoSuccess',
	DELETE_TODO_FAIL = '[Todo] DeleteTodoFail',
	CREATE_TODO_SUCCESS = '[Todo] CreateMonthSuccess',
	CREATE_TODO_FAIL = '[Todo] CreateMonthFail',
	CREATE_TODO = '[Todo] CreateTodo',
	UPDATE_TODO_SUCCESS = '[Todo] LoadMonthSuccess',
	UPDATE_TODO_FAIL = '[Todo] LoadMonthFail',
	UPDATE_TODO = '[Todo] UpdateTodo',
	LOAD_IMPORTANCE = '[Todo] LoadImportance',
	LOAD_IMPORTANCE_SUCCESS = '[Todo] LoadImportanceSuccess'
}

export const LoadImportanceOptions = createAction(TodoActionTypes.LOAD_IMPORTANCE);
export const LoadImportanceOptionsSuccess = createAction(TodoActionTypes.LOAD_IMPORTANCE_SUCCESS, props<{ options : DropdownOption[] }>());

export const LoadTodosAll = createAction(TodoActionTypes.LOAD_TODOS_ALL);
export const LoadTodosAllSuccess = createAction(TodoActionTypes.LOAD_TODOS_ALL_SUCCESS, props<{items : ToDoItem[]}>());
export const LoadTodosAllFail = createAction(TodoActionTypes.LOAD_TODOS_ALL_FAIL, props<{ err : any }>());

export const LoadTodosMonth = createAction(TodoActionTypes.LOAD_TODOS_MONTH);
export const LoadTodosMonthSuccess = createAction(TodoActionTypes.LOAD_TODOS_MONTH_SUCCESS, props<{ items : ToDoItem[] }>());
export const LoadTodosMonthFail = createAction(TodoActionTypes.LOAD_TODOS_MONTH_FAIL, props<{ err : any }>());
// export const LoadTodosDay = createAction(TodoActionTypes.LOAD_TODOS_DAY, props<{ selectedDay : number }>());
// export const LoadTodosDaySuccess = createAction(TodoActionTypes.LOAD_TODOS_DAY_SUCCESS, props<{ items : ToDoItem[] }>());
// export const LoadTodosDayFail = createAction(TodoActionTypes.LOAD_TODOS_DAY_FAIL, props<{ err : any }>());
// export const LoadTodo = createAction(TodoActionTypes.LOAD_TODO, props<{ id : number }>());
// export const LoadTodoSuccess = createAction(TodoActionTypes.LOAD_TODO_SUCCESS, props<{ item : ToDoItem }>());
// export const LoadTodoFail = createAction(TodoActionTypes.LOAD_TODO_FAIL, props<{ err : any }>());

export const CreateTodo = createAction(TodoActionTypes.CREATE_TODO , props<{ item : ToDoItem }>());
export const CreateTodoSuccess = createAction(TodoActionTypes.CREATE_TODO_SUCCESS , props<{ item : ToDoItem }>());
export const CreateTodoFail = createAction(TodoActionTypes.CREATE_TODO_FAIL , props<{ err : any }>());

export const UpdateTodo = createAction(TodoActionTypes.UPDATE_TODO, props<{ id : number, item : ToDoItem}>());
export const UpdateTodoSuccess = createAction(TodoActionTypes.UPDATE_TODO_SUCCESS, props<{ id : number, updatedItem : ToDoItem }>());
export const UpdateTodoFail = createAction(TodoActionTypes.UPDATE_TODO_FAIL, props<{ err : any }>());

export const DeleteTodo = createAction(TodoActionTypes.DELETE_TODO, props<{ id : number }>());
export const DeleteTodoSuccess = createAction(TodoActionTypes.DELETE_TODO_SUCCESS , props<{ id : number }>());
export const DeleteTodoFail = createAction(TodoActionTypes.DELETE_TODO_FAIL , props<{ err : any }>());
