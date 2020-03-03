import { createFeatureSelector, createSelector } from '@ngrx/store';
import ToDoState, { TODO_FEATURE_KEY } from '@states/todo';
import { CustomRouterReducerState } from './router.selector';

export const selectFeature = createFeatureSelector<ToDoState>(TODO_FEATURE_KEY);
export const selectRouteFeature = createFeatureSelector<CustomRouterReducerState>('router');

export const selectAll = createSelector(
	selectFeature,
	(state : ToDoState) => state.items
)

export const getSelectedTodo = createSelector(
    selectAll, 
    selectRouteFeature,
	(todos, customRoute) => todos.find(i => { return i.Id === +customRoute.state.params['itemId']; })
);
	
export const selectTodosByMonthAndDay = createSelector(
	selectFeature,
	(state : ToDoState, props : { month : number, day : number }) => {
		return state.items
			.filter(i => i.Date && i.Date.month === props.month && i.Date.day === props.day)
			.sort((next, prev) => {
				// TODO add moving todos without time to the end
				if (!prev.Time || !next.Time) { return 1; }
				// if (prev.Type === ItemType.UndefiniteTime) { return -1; }
				return next.Time.hour - prev.Time.hour;
			});
	}
);

export const selectById = createSelector(
	selectFeature,
	(state : ToDoState, props : { id : number }) => state.items.find(i => i.Id === props.id)
);

export const itemsLoading = createSelector(
	selectFeature,
	(state : ToDoState) => state.itemsLoading
);

export const selectImportanceOptions = createSelector(
	selectFeature,
	(state : ToDoState) => state.imprtanceOptions
);
