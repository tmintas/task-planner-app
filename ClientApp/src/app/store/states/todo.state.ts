import { Todo } from '@todo-models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DropdownOption } from '@shared-models';
import { HandledError } from 'app/shared/models/handled-error.model';

export const TODO_FEATURE_KEY = 'todo';
export const TODO_MAX_ITEMS_DOR_DAY = 3;

export const todoSortFunc = (next : Todo, prev : Todo) => {
	if (!prev.HasTime || !next.HasTime) return 1;
	
	return (prev.Date > next.Date) ? -1 : 1;
}

export const todoSortDone = (next : Todo, prev : Todo) => {
	
	return !next.IsDone && prev.IsDone ? -1 : 1;
}

export const adapter : EntityAdapter<Todo> = createEntityAdapter<Todo>();

export interface TodosState extends EntityState<Todo> {
	importanceOptions : DropdownOption[];
	itemsLoading : boolean;
	itemsLoaded : boolean;
	error : HandledError;
}

export const initialTodosState : TodosState = adapter.getInitialState({
	importanceOptions : [],
	itemsLoading : false,
	itemsLoaded : false,
	error : null
});


