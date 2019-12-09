import { Action, createReducer, on } from '@ngrx/store';
import * as fromTodoActions from '../actions/todo.actions';
import * as fromTodoState from '../states/todo.state';
import ToDoState from '../states/todo.state';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

export const initialState = fromTodoState.initializeState();

const toDoReducer = createReducer(
	fromTodoState.initialState,
	on(
		fromTodoActions.AddTodo, 
		(state : ToDoState, newItem : { payload : ToDoItem }) => 
		{
			return { ...state, items : [ ...state.items, newItem.payload ] };
		}
	)
)
		
export function TodoReducer(
	state : ToDoState | undefined, 
	action : Action) {
	return toDoReducer(state, action)
}