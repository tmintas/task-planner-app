import { Action, createReducer, on } from '@ngrx/store';
import ToDoState , * as fromTodoState from '@states/todo';
import * as fromTodoActions from '@actions/todo';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

const toDoReducer = createReducer(
	fromTodoState.TODO_INITIAL_STATE,
	on(
		fromTodoActions.AddTodo, 
		(state : ToDoState, payload : { item : ToDoItem }) => 
		{
			payload.item.Id = state.items.length;
			return { ...state, items : [ ...state.items, payload.item ] };
		}
	),
	on(
		fromTodoActions.DeleteTodo,
		(state : ToDoState, payload : { id : number })  => 
		{
			return { ...state, items : [...state.items.filter(i => i.Id !== payload.id)] }
		}
	),
	on(
		fromTodoActions.LoadMonthTodosSuccess,
		(state : ToDoState, payload : { items : ToDoItem[] }) => 
		{
			console.log('load sucess');
			
			return { ...state, items : payload.items }
		}
	)
)
		
export function TodoReducer(
	state : ToDoState | undefined, 
	action : Action) {
	return toDoReducer(state, action)
}