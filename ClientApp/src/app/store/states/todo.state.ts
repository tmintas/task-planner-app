import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

export const TODO_FEATURE_KEY = 'todo';

export default class ToDoState {
	public items : ToDoItem[];

	public itemsLoading : boolean;
	public itemsLoaded : boolean;

	public error : any;
}

export const TODO_INITIAL_STATE : ToDoState = {
	items : [ ],
	itemsLoaded : false,
	itemsLoading : true,
	error : null
};
