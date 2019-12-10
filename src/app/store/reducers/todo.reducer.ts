import { Action, createReducer, on } from '@ngrx/store';
import ToDoState, * as fromTodoState from '@states/todo';
import * as fromTodoActions from '@actions/todo';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

export const initialState = fromTodoState.initializeState();

const toDoReducer = createReducer(
	fromTodoState.initialState,
	on(
		fromTodoActions.AddTodo, 
		(state : ToDoState, newItem : { payload : ToDoItem }) => 
		{
			newItem.payload.Id = state.items.length;
			return { ...state, items : [ ...state.items, newItem.payload ] };
		}
	),
	on(
		fromTodoActions.DeleteTodo,
		(state : ToDoState, indexToRemove : { payload : number }) => 
		{
			return { ...state, items : [...state.items.filter(i => i.Id !== indexToRemove.payload)]}
		}
	)
)
		
export function TodoReducer(
	state : ToDoState | undefined, 
	action : Action) {
	return toDoReducer(state, action)
}