import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { Importance } from 'app/to-dos/enums/importance.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromTodoActions from '../actions/todo.actions';

export interface State {
	items : ToDoItem[]
}

const initialState : State = {
	items : [
		new ToDoItem(new Date(2019,5,5), "namete", "destest", Importance.High) ,
		new ToDoItem(new Date(2019,10,10), "namete", "destest", Importance.High),
		new ToDoItem(new Date(2019,10,10), "tests", "destest", Importance.Low),
		new ToDoItem(new Date(2019,10,10), "namasdfasdete", "destest", Importance.Middle) 
	]
}

const toDoReducer = createReducer(
	initialState,
	on(fromTodoActions.AddTodo, state => state)
)

export function reducer(
	state : State | undefined, 
	action : Action) {
	return toDoReducer(state, action)
}