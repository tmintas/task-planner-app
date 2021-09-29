import { Action, createReducer, on } from '@ngrx/store';
import * as fromTodoActions from '@actions/todo';
import { Todo } from 'app/to-dos/models/todo.model';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Update } from '@ngrx/entity';
import { initialTodosState, TodosState, adapter } from '@states/todo';

const toDoReducer = createReducer(
	initialTodosState,
	// load all
	on(fromTodoActions.LoadTodosAll, (state : TodosState) => {
		return { ...state,
			isLoading : true,
			loadingMessage : 'Loading your items...',
		};
	}),
	on(fromTodoActions.LoadTodosAllSuccess, (state : TodosState, payload : { items : Todo[] }) => {
		return adapter.setAll(payload.items, { ...state, 
			isLoading: false,
			loadingMessage : null,
		})
	}),
	on(fromTodoActions.LoadTodosAllFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			items : [],
			isLoading: false,
			error : payload.err
		};
	}),
	// create
	on(fromTodoActions.CreateTodo, (state : TodosState) => {
		return { ...state,
			isLoading: true,
			loadingMessage : 'Creating a new item...',
		};
	}),
	on(fromTodoActions.CreateTodoSuccess, (state : TodosState, payload : { item : Todo }) => {
		// TODO move to state
		payload.item.Visible = true;

		return { ...adapter.addOne(payload.item, state),
			isLoading: false,
			loadingMessage : null
		};
	}),
	on(fromTodoActions.CreateTodoFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			isLoading: false,
			error : payload.err
		};
	}),
	on(fromTodoActions.LoadImportanceOptionsSuccess, (state : TodosState, payload : { options : DropdownOption[]}) => {
		return { ...state,
			importanceOptions : payload.options,
		};
	}),
	// delete
	on(fromTodoActions.DeleteTodoStart, (state : TodosState) => {
		return { ...state,
			isLoading: true,
			loadingMessage : 'Deleting your item...'
		};
	}),
	on(fromTodoActions.DeleteTodoSuccess, (state : TodosState, payload : { id : number })  => {
		return { ...adapter.removeOne(payload.id, state),
			isLoading: false,
			loadingMessage : null
		}
		// TODO probably better to use effects for that - repeatable logic
	}),
	on(fromTodoActions.DeleteTodoFail, (state : TodosState, payload : { err : any })  => {
		return { ...state,
			isLoading: false,
			error : payload.err
		};
	}),
	// update
	on(fromTodoActions.UpdateTodo, (state : TodosState) => {
		return { ...state,
			isLoading: true,
			loadingMessage: 'Updating your item...'
		};
	}),
	on(fromTodoActions.UpdateTodoSuccess, (state : TodosState, payload : { item : Update<Todo> }) => {
		return { ...adapter.updateOne(payload.item, state),
			isLoading: false,
			loadingMessage: null
		};
	}),
	on(fromTodoActions.UpdateTodoFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			error : payload.err,
			isLoading: false,
		};	
	}),
	on(fromTodoActions.ToggleDone, (state : TodosState, payload : { id : string }) => {
		const update : Update<Todo> = {
			id : payload.id,
			changes : { IsDone : !state.entities[payload.id].IsDone }
		}

		return adapter.updateOne(update, state);
	}),
	on(fromTodoActions.UpdateVisibility, 
		(state : TodosState, payload : { items : Update<Todo>[] }) => adapter.updateMany(payload.items, state)
	),
	on(fromTodoActions.ClearTodos,
		(state : TodosState) => adapter.removeAll(state)
	)
);

export function todoReducer(
	state : any,
	action : Action) {
	return toDoReducer(state, action);
}
