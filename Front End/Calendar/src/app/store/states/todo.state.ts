import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';

export const TODO_FEATURE_KEY = 'todo';

export default class ToDoState {
	public items : ToDoItem[];
	public imprtanceOptions : DropdownOption[];

	public itemsLoading : boolean;
	public itemsLoaded : boolean;

	public error : any;
}

export const TODO_INITIAL_STATE : ToDoState = {
	items : [ ],
	imprtanceOptions : [],
	itemsLoaded : false,
	itemsLoading : false,
	error : null
};
