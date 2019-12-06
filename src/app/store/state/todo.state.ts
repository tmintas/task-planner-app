import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

import { Importance } from 'app/to-dos/enums/importance.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface ToDoState {
	items : ToDoItem[]
}

export const initialState : ToDoState = {
	items : [
		new ToDoItem(new Date(2019,5,5), "namete", "destest", Importance.High) ,
		new ToDoItem(new Date(2019,11,10), "namete", "destest", Importance.High),
		new ToDoItem(new Date(2019,10,10), "tests", "destest", Importance.Low),
		new ToDoItem(new Date(2019,10,10), "namasdfasdete", "destest", Importance.Middle) 
	]
}

export const selectAllTodos = (state : ToDoState) => state.items;

export const selectFeature = createFeatureSelector('todo');
export const selectTodosByMonth = createSelector(
    selectFeature,
    (state : ToDoState, props) => state.items.filter(i => i.Date.getMonth() === props.month)
)