import { createAction, props } from '@ngrx/store';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Todo } from '@todo-models';
import { Update } from '@ngrx/entity';

export const enum TodoActionTypes {
	LOAD_TODOS_ALL = '[Todo] LoadAll',
	LOAD_TODOS_ALL_SUCCESS = '[Todo] LoadAllSuccess',
	LOAD_TODOS_ALL_FAIL = '[Todo] LoadAllFail',
	LOAD_TODO = '[Todo] Load Todo',
	LOAD_TODO_SUCCESS = '[Todo] LoadTodoSuccess',
	LOAD_TODO_FAIL = '[Todo] LLoadTodoFail',
	DELETE_TODO_START = '[Todo] Delete Todo Start',
	DELETE_TODO_SUCCESS = '[Todo] Delete Todo Success',
	DELETE_TODO_FAIL = '[Todo] Delete Todo Fail',
	SELECT_ITEM_FOR_EDIT = '[Todo] Select Item for Edit',
	SUBMIT_TODO = '[Todo] Submit Todo',
	CREATE_TODO = '[Todo] Create Todo',
	CREATE_TODO_SUCCESS = '[Todo] Create Todo Success',
	CREATE_TODO_FAIL = '[Todo] CreateTodoFail',
	UPDATE_TODO_SUCCESS = '[Todo] Update Todo Success',
	UPDATE_TODO_FAIL = '[Todo] Update Todo Fail',
	UPDATE_TODO = '[Todo] Update Todo',
	LOAD_IMPORTANCE = '[Todo] LoadImportance',
	LOAD_IMPORTANCE_SUCCESS = '[Todo] LoadImportanceSuccess',
	SHOW_ALERT = "[Todo] Show Alert"
}

export const LoadImportanceOptions = createAction(TodoActionTypes.LOAD_IMPORTANCE);
export const LoadImportanceOptionsSuccess = createAction(TodoActionTypes.LOAD_IMPORTANCE_SUCCESS, props<{ options : DropdownOption[] }>());

export const LoadTodosAll = createAction(TodoActionTypes.LOAD_TODOS_ALL);
export const LoadTodosAllSuccess = createAction(TodoActionTypes.LOAD_TODOS_ALL_SUCCESS, props<{items : Todo[]}>());
export const LoadTodosAllFail = createAction(TodoActionTypes.LOAD_TODOS_ALL_FAIL, props<{ err : any }>());

export const CreateTodo = createAction(TodoActionTypes.CREATE_TODO , props<{ item : Todo }>());
export const CreateTodoSuccess = createAction(TodoActionTypes.CREATE_TODO_SUCCESS , props<{ item : Todo }>());
export const CreateTodoFail = createAction(TodoActionTypes.CREATE_TODO_FAIL , props<{ err : any }>());

export const UpdateTodo = createAction(TodoActionTypes.UPDATE_TODO, props<{ item : Update<Todo> }>());
export const UpdateTodoSuccess = createAction(TodoActionTypes.UPDATE_TODO_SUCCESS, props<{ item : Update<Todo> }>());
export const UpdateTodoFail = createAction(TodoActionTypes.UPDATE_TODO_FAIL, props<{ err : any }>());

export const DeleteTodoStart = createAction(TodoActionTypes.DELETE_TODO_START , props<{ id : number }>());
export const DeleteTodoSuccess = createAction(TodoActionTypes.DELETE_TODO_SUCCESS , props<{ id : number }>());
export const DeleteTodoFail = createAction(TodoActionTypes.DELETE_TODO_FAIL , props<{ err : any }>());

export const SelectItemForEdit = createAction(TodoActionTypes.SELECT_ITEM_FOR_EDIT, props<{ itemId : number }>());
export const SubmitTodo = createAction(TodoActionTypes.SUBMIT_TODO , props<{ item : Todo }>());