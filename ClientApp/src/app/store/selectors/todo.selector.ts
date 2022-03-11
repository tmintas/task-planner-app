import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, TODO_FEATURE_KEY, TodosState } from '@states/todo';
import * as fromRouterState from '@states/router';
import { CustomRouterReducerState } from '@states/router';
import { Todo } from '@todo-models';
import * as dateHelper from "@shared-functions/date";

export const featureSelector = createFeatureSelector<TodosState>(TODO_FEATURE_KEY);
export const selectRouteFeature = createFeatureSelector<CustomRouterReducerState>(fromRouterState.ROUTER_FEATURE_KEY);
const {
	selectAll,
} = adapter.getSelectors();
  
export const selectAllTodos = createSelector(
	featureSelector,
	selectAll
  );

export const selectTodosByDate = createSelector(
	selectAllTodos,
	(todos : Todo[], props : { date : Date }) => {
		if (!todos.length) return [];

		return todos.filter(todo => dateHelper.areDatesEqual(todo.Date, props.date))
	}
);

export const selectById = createSelector(
	selectAllTodos,
	(items : Todo[], props : { id : number }) => items.find(i => i.id === props.id)
);

export const isLoading = createSelector(
	featureSelector,
	(state : TodosState) => state.isLoading
);

export const loadingMessage = createSelector(
	featureSelector,
	(state : TodosState) => state.loadingMessage
);

export const selectImportanceOptions = createSelector(
	featureSelector,
	(state : TodosState) => state.importanceOptions
);

export const selectedTodo = createSelector(
	featureSelector,
	(state : TodosState) => state.selectedItem
);

export const isItemEditing = createSelector(
	selectedTodo,
	(item : Todo, props) => item && props && item.id === props.id
);