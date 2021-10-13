import {createReducer, on} from '@ngrx/store';
import * as fromTodoActions from '@actions/todo';
import {Todo} from 'app/to-dos/models/todo.model';
import {DropdownOption} from 'app/shared/models/dropdown-option.model';
import {Update} from '@ngrx/entity';
import {adapter, initialTodosState, TodosState} from '@states/todo';

export const todoReducer = createReducer(
	initialTodosState,
	on(
		fromTodoActions.LoadTodosAll,
		fromTodoActions.CreateTodo,
		fromTodoActions.UpdateTodo,
		fromTodoActions.DeleteTodo,
		(state: TodosState) => { 
			return { 
				...state, 
				isLoading: true 
			}
		}),	
	on(
		fromTodoActions.LoadTodosAllSuccess,
		fromTodoActions.LoadTodosAllFail,
		fromTodoActions.CreateTodoSuccess,
		fromTodoActions.CreateTodoFail,
		fromTodoActions.DeleteTodoSuccess,
		fromTodoActions.DeleteTodoFail,
		fromTodoActions.UpdateTodoSuccess,
		fromTodoActions.UpdateTodoFail,
		(state: TodosState) => { 
			return { 
				...state, 
				isLoading: false,
				loadingMessage : null
			} ;
		}),
	on(fromTodoActions.LoadTodosAll, (state : TodosState) => {
		return { ...state,
			loadingMessage : 'Loading your items...',
		};
	}),
	on(fromTodoActions.LoadTodosAllSuccess, (state : TodosState, payload : { items : Todo[] }) => {
		return adapter.setAll(payload.items, state)
	}),
	on(fromTodoActions.LoadTodosAllFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			items : [],
			error : payload.err
		};
	}),
	on(fromTodoActions.CreateTodo, (state : TodosState) => {
		return { ...state,
			loadingMessage : 'Creating a new item...',
		};
	}),
	on(fromTodoActions.CreateTodoSuccess, (state : TodosState, payload : { item : Todo }) => {
		return adapter.addOne(payload.item, state);
	}),
	on(fromTodoActions.CreateTodoFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			error : payload.err
		};
	}),
	on(fromTodoActions.LoadImportanceOptionsSuccess, (state : TodosState, payload : { options : DropdownOption[]}) => {
		return { ...state,
			importanceOptions : payload.options,
		};
	}),
	on(fromTodoActions.DeleteTodo, (state : TodosState) => {
		return { ...state,
			loadingMessage : 'Deleting your item...'
		};
	}),
	on(fromTodoActions.DeleteTodoSuccess, (state : TodosState, payload : { id : number })  => {
		return adapter.removeOne(payload.id, state)
	}),
	on(fromTodoActions.DeleteTodoFail, (state : TodosState, payload : { err : any })  => {
		return { ...state,
			error : payload.err
		};
	}),
	on(fromTodoActions.UpdateTodo, (state : TodosState) => {
		return { ...state,
			loadingMessage: 'Updating your item...'
		};
	}),
	on(fromTodoActions.UpdateTodoSuccess, (state : TodosState, payload : { item : Update<Todo> }) => {
		return adapter.updateOne(payload.item, state)
	}),
	on(fromTodoActions.UpdateTodoFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			error : payload.err,
		};	
	}),
	on(fromTodoActions.ToggleDone, (state : TodosState, payload : { id : number }) => {
		const update : Update<Todo> = {
			id : payload.id,
			changes : { IsDone : !state.entities[payload.id].IsDone }
		}

		return adapter.updateOne(update, state);
	}),
	on(fromTodoActions.ClearTodos,
		(state : TodosState) => adapter.removeAll(state)
	)
);
