import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODO_FEATURE_KEY } from '@states/todo';
import { CustomRouterReducerState } from './router.selector';
import * as fromRouterState from '@states/router';
import { adapter, TodosState } from '@reducers/todo';
import { Todo } from '@todo-models';

export const selectFeature = createFeatureSelector<TodosState>(TODO_FEATURE_KEY);
export const selectRouteFeature = createFeatureSelector<CustomRouterReducerState>(fromRouterState.ROUTER_FEATURE_KEY);
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = adapter.getSelectors();
  
export const selectTodoIds = selectIds; 
export const selectTodoEntities = selectEntities;
export const selectAllTodos = createSelector(
	selectFeature,
	selectAll
  );

export const selectTodoTotal = selectTotal;

export const getSelectedTodo = createSelector(
    selectAllTodos, 
    selectRouteFeature,
	(todos, customRoute) => todos.find(i => { return i.id === +customRoute.state.params['itemId']; })
);
	
export const getSelectedTodoId = createSelector(
    selectAllTodos, 
    selectRouteFeature,
	(todos, customRoute) => {
		const todo = todos.find(i => { return i.id === +customRoute.state.params['itemId']; });
		return todo != null ? todo.id : 0;
	}
);

export const selectTodosByMonthAndDay = createSelector(
	selectAllTodos,
	(state : Todo[], props : { month : number, day : number }) => {
		return state
			.filter(i => i.Date && i.Date.getMonth() + 1 === props.month && i.Date.getDate() === props.day)
			.sort((next, prev) => {
				// TODO add moving todos without time to the end
				if (!prev.Date || !next.Date) { return 1; }
				// if (prev.Type === ItemType.UndefiniteTime) { return -1; }
				return next.Date.getHours() - prev.Date.getHours();
			});
	}
);

export const selectById = createSelector(
	selectAllTodos,
	(items : Todo[], props : { id : number }) => items.find(i => i.id === props.id)
);

export const itemsLoading = createSelector(
	selectFeature,
	(state : TodosState) => state.itemsLoading
);

export const selectImportanceOptions = createSelector(
	selectFeature,
	(state : TodosState) => state.importanceOptions
);
