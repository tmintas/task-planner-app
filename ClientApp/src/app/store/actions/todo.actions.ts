import { createAction, props } from '@ngrx/store';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Todo } from '@todo-models';
import { Update } from '@ngrx/entity';

export const enum TodoActionTypes {
	LOAD_TODOS_ALL_START = '[Month Component] Load All Todos Start',
	LOAD_TODOS_ALL_SUCCESS = '[Todo Effect Action] Load All Todos Success',
	LOAD_TODOS_ALL_FAIL = '[Todo Effect Action] LoadAllFail',
	DELETE_TODO_START = '[Todo Effect Action] Delete Todo Start',
	DELETE_TODO_SUCCESS = '[Todo Effect Action] Delete Todo Success',
	DELETE_TODO_FAIL = '[Todo Effect Action] Delete Todo Fail',
	SELECT_ITEM_FOR_EDIT = '[Calendar User Action] Select Item for Edit',
	SUBMIT_TODO = '[Calendar User Action] Submit Todo',
	CREATE_TODO = '[Todo Effect Action] Create Todo',
	CREATE_TODO_SUCCESS = '[Todo Effect Action] Create Todo Success',
	CREATE_TODO_FAIL = '[Todo Effect Action] CreateTodoFail',
	UPDATE_TODO_SUCCESS = '[Todo Effect Action] Update Todo Success',
	UPDATE_TODO_FAIL = '[Todo Effect Action] Update Todo Fail',
	UPDATE_TODO = '[Todo Effect Action] Update Todo',
	LOAD_IMPORTANCE_START = '[Month Component] Load Importance Options Start',
	LOAD_IMPORTANCE_SUCCESS = '[Todo Effect Action] Load Importance Options Success',
	TOGGLE_DONE = '[Calendar User Action] Toggle done',
	TOGGLE_DONE_SUCCESS = '[Todo Effect Action] Toggle done success',
	TOGGLE_DONE_FAIL = '[Todo Effect Action] Toggle done fail'
}

export const test = 5;
export const LoadImportanceOptions = createAction(TodoActionTypes.LOAD_IMPORTANCE_START);
export const LoadImportanceOptionsSuccess = createAction(TodoActionTypes.LOAD_IMPORTANCE_SUCCESS, props<{ options : DropdownOption[] }>());

export const LoadTodosAll = createAction(TodoActionTypes.LOAD_TODOS_ALL_START);
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

export const ToggleDone = createAction(TodoActionTypes.TOGGLE_DONE, props<{ id : string }>());
export const ToggleDoneSuccess = createAction(TodoActionTypes.TOGGLE_DONE_SUCCESS);
export const ToggleDoneFail = createAction(TodoActionTypes.TOGGLE_DONE_FAIL, props<{ err : any }>());

export const SubmitTodo = createAction(TodoActionTypes.SUBMIT_TODO , props<{ item : Todo }>());
