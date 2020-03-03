import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

export const TODO_FEATURE_KEY = 'todo';

export default class ToDoState {
	items : ToDoItem[]
}

export const TODO_INITIAL_STATE : ToDoState = {
	items : [ ]
}
