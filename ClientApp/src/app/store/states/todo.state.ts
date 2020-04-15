import { Todo } from '@todo-models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DropdownOption } from '@shared-models';
import { HandledError } from 'app/shared/models/handled-error.model';

export const TODO_FEATURE_KEY = 'todo';

function sortByDate(prev : Todo, next : Todo) {
	if (!prev.HasTime || !next.HasTime) return 1;
	return prev.Date > next.Date ? 1 : 0;
}

export const adapter : EntityAdapter<Todo> = createEntityAdapter<Todo>({
	sortComparer : sortByDate
});


export interface TodosState extends EntityState<Todo> {
	importanceOptions : DropdownOption[];
	itemsLoading : boolean;
	itemsLoaded : boolean;
	selectedItem : Todo;
	error : HandledError;
}

export const initialTodosState : TodosState = adapter.getInitialState({
	importanceOptions : [],
	itemsLoading : false,
	itemsLoaded : false,
	selectedItem : null,
	error : null
});


