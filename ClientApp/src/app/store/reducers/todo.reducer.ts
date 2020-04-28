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
			itemsLoading : true,
			itemsLoaded : false
		};
	}),
	on(fromTodoActions.LoadTodosAllSuccess, (state : TodosState, payload : { items : Todo[] }) => {
		return adapter.addAll(payload.items, { ...state, 
			itemsLoading: false,
			itemsLoaded: true
		})
	}),
	on(fromTodoActions.LoadTodosAllFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			items : [],
			itemsLoading: false,
			itemsLoaded: true,
			error : payload.err
		};
	}),
	// create
	on(fromTodoActions.CreateTodo, (state : TodosState) => {
		return { ...state,
			itemsLoaded: false,
			itemsLoading: true
		};
	}),
	on(fromTodoActions.CreateTodoSuccess, (state : TodosState, payload : { item : Todo }) => {
		// TODO move to state
		payload.item.Visible = true;

		return { ...adapter.addOne(payload.item, state),
			itemsLoaded: true,
			itemsLoading: false
		};
	}),
	on(fromTodoActions.CreateTodoFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			itemsLoaded: true,
			itemsLoading: false,
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
			itemsLoading: true,
			itemsLoaded: false
		};
	}),
	on(fromTodoActions.DeleteTodoSuccess, (state : TodosState, payload : { id : number })  => {
		return { ...adapter.removeOne(payload.id, state),
			itemsLoaded: true,
			itemsLoading: false
		}
		// TODO probably better to use effects for that - repeatable logic
	}),
	on(fromTodoActions.DeleteTodoFail, (state : TodosState, payload : { err : any })  => {
		return { ...state,
			itemsLoaded: true,
			itemsLoading: false,
			error : payload.err
		};
	}),
	// update
	on(fromTodoActions.UpdateTodo, (state : TodosState) => {
		return { ...state,
			itemsLoaded: false,
			itemsLoading: true,
		};
	}),
	on(fromTodoActions.UpdateTodoSuccess, (state : TodosState, payload : { item : Update<Todo> }) => {
		return { ...adapter.updateOne(payload.item, state),
			itemsLoaded: true,
			itemsLoading: false,
		};
	}),
	on(fromTodoActions.UpdateTodoFail, (state : TodosState, payload : { err : any }) => {
		return { ...state,
			error : payload.err,
			itemsLoaded: true,
			itemsLoading: false,
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
	)
);

// tslint:disable-next-line: typedef
export function TodoReducer(
	state : any,
	action : Action) {
	return toDoReducer(state, action);
}
