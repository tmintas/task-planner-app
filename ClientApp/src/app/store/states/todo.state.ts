import { Todo } from '@todo-models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DropdownOption } from '@shared-models';

export const TODO_FEATURE_KEY = 'todo';

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
	isLoading : boolean;
	loadingMessage : string,
	itemsLoaded : boolean;
	// error : HandledError;
}

export const initialTodosState : TodosState = adapter.getInitialState({
	importanceOptions : [],
	loadingMessage : null,
	isLoading : false,
	itemsLoaded : false,
	// error : null
});


