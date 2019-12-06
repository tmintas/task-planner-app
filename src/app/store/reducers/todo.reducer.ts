import { Action, createReducer, on } from '@ngrx/store';
import * as fromTodoActions from '../actions/todo.actions';
import * as fromTodoState from '../state/todo.state';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

export const todoFeatureKey = 'todo';

const toDoReducer = createReducer(
	fromTodoState.initialState,
	on(
		fromTodoActions.AddTodo, 
		(state : fromTodoState.ToDoState, newItem : ToDoItem) => 
		{
			return { ...state, items : [ ...state.items, newItem] 
			};
		})
		)
		
export function TodoReducer(
	state : fromTodoState.ToDoState | undefined, 
	action : Action) {
	return toDoReducer(state, action)
}