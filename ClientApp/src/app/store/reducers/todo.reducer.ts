import { Action, createReducer, on } from '@ngrx/store';
import ToDoState , * as fromTodoState from '@states/todo';
import * as fromTodoActions from '@actions/todo';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';

const toDoReducer = createReducer(
	fromTodoState.TODO_INITIAL_STATE,
	// load all
	on(fromTodoActions.LoadTodosAll,
		(state : ToDoState) => {
			return { ...state,
				itemsLoading : true,
				itemsLoaded : false
			};
		}
	),
	on(
		fromTodoActions.LoadTodosAllSuccess,
		(state : ToDoState, payload : { items : ToDoItem[] }) => {
			const items = payload.items.slice();
			items.forEach(i => i.Visible = true);

			return { ...state,
				items : items,
				itemsLoading: false,
				itemsLoaded: true
			};
		}
	),
	on(
		fromTodoActions.LoadTodosAllFail,
		(state : ToDoState, payload : { err : any }) => {
			return { ...state,
				items : [],
				itemsLoading: false,
				itemsLoaded: true,
				error : payload.err
			};
		}
	),
	// create
	on(
		fromTodoActions.CreateTodo,
		(state : ToDoState, payload : { item : ToDoItem }) => {
			return { ...state,
				itemsLoaded: false,
				itemsLoading: true
			};
		}
	),
	on(
		fromTodoActions.CreateTodoSuccess,
		(state : ToDoState, payload : { item : ToDoItem }) => {
			payload.item.Visible = true;

			return { ...state,
				items : [ ...state.items, payload.item ],
				itemsLoaded: true,
				itemsLoading: false
			};
		}
	),
	on(
		fromTodoActions.CreateTodoFail,
		(state : ToDoState, payload : { err : any }) => {
			return { ...state,
				itemsLoaded: true,
				itemsLoading: false,
				error : payload.err
			};
		}
	),
	on(
		fromTodoActions.LoadImportanceOptionsSuccess,
		(state : ToDoState, payload : { options : DropdownOption[]}) => {
			return { ...state,
				imprtanceOptions : payload.options,
			};
		}
	),
	// delete
	on(
		fromTodoActions.DeleteTodoStart,
		(state : ToDoState)  => {
			return { ...state,
				itemsLoading: true,
				itemsLoaded: false
			};
		}
	),
	on(
		fromTodoActions.DeleteTodoSuccess,
		(state : ToDoState, payload : { id : number })  => {
			return { ...state,
				items : [...state.items.filter(i => i.Id !== payload.id)],
				itemsLoaded: true,
				itemsLoading: false
			};
		}
	),
	on(
		fromTodoActions.DeleteTodoFail,
		(state : ToDoState, payload : { err : any })  => {
			return { ...state,
				itemsLoaded: true,
				itemsLoading: false,
				error : payload.err
			};
		}
	),
	// update
	on(
		fromTodoActions.UpdateTodo,
		(state : ToDoState, payload : { id : number, item : ToDoItem }) => {
			return { ...state,
				itemsLoaded: false,
				itemsLoading: true,
			};
		}
	),
	on(
		fromTodoActions.UpdateTodoFail,
		(state : ToDoState, payload : { err : any }) => {

			return { ...state,
				error : payload.err,
				itemsLoaded: true,
				itemsLoading: false,
			};
		}
	)
);

// tslint:disable-next-line: typedef
export function TodoReducer(
	state : any,
	action : Action) {
	return toDoReducer(state, action);
}
