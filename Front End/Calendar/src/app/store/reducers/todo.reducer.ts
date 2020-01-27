import { Action, createReducer, on } from '@ngrx/store';
import ToDoState , * as fromTodoState from '@states/todo';
import * as fromTodoActions from '@actions/todo';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

const toDoReducer = createReducer(
	fromTodoState.TODO_INITIAL_STATE,
	// load month
	on(fromTodoActions.LoadTodosMonth,
		(state : ToDoState) => {
			return { ...state,
				itemsLoading : true,
				itemsLoaded : false
			};
		}
	),
	on(
		fromTodoActions.LoadTodosMonthSuccess,
		(state : ToDoState, payload : { items : ToDoItem[] }) => {
			return { ...state,
				items : payload.items,
				itemsLoading: false,
				itemsLoaded: true
			};
		}
	),
	on(
		fromTodoActions.LoadTodosMonthFail,
		(state : ToDoState, payload : { err : any }) => {
			return { ...state,
				items : [],
				itemsLoading: false,
				itemsLoaded: true,
				error : payload.err
			};
		}
	),
	// load day
	on(fromTodoActions.LoadTodosDaySuccess,
		(state : ToDoState, payload : { items : ToDoItem[] }) => {
			return { ...state,
				items : payload.items,
				itemsLoading : true,
				itemsLoaded : false
			};
		}
	),
	on(
		fromTodoActions.LoadTodosDayFail,
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
		(state : ToDoState) => {
			return { ...state,
				itemsLoaded: false,
				itemsLoading: true
			};
		}
	),
	on(
		fromTodoActions.CreateTodoSuccess,
		(state : ToDoState, payload : { item : ToDoItem }) => {
			payload.item.Id = state.items.length;
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
	// delete
	on(
		fromTodoActions.DeleteTodo,
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
		(state : ToDoState) => {
			return { ...state,
				itemsLoaded: false,
				itemsLoading: true,
			};
		}
	),
	on(
		fromTodoActions.UpdateTodoSuccess,
		(state : ToDoState, payload : { id : number, updatedItem : ToDoItem }) => {
			const updatedTodo : ToDoItem = {
				...state.items[payload.id],
				...payload.updatedItem
			};

			const itemsCopy = [...state.items];
			itemsCopy[payload.id] = updatedTodo;

			return { ...state,
				items: itemsCopy,
				itemsLoaded: true,
				itemsLoading: false,
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
