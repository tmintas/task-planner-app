import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

export const TODO_FEATURE_KEY = 'todo';

export default class ToDoState {
	items : ToDoItem[];

	itemsLoading : boolean;
	itemsLoaded : boolean;
}

export const TODO_INITIAL_STATE : ToDoState = {
	items : [ ],
	itemsLoaded : false,
	itemsLoading : true
}
