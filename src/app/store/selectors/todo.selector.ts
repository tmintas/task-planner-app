import ToDoState, { todoFeatureKey } from '../states/todo.state';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAllTodos = (state: ToDoState) => state.items;

export const selectFeature = createFeatureSelector(todoFeatureKey);

export const selectTodosByMonthAndDay = createSelector(
    selectFeature,
    (state: ToDoState, props: { month: number, day: number }) => {
        return state.items
            .filter(i => i.Date.month === props.month && i.Date.day === props.day)
            .sort((next, prev) => next.Time.hour - prev.Time.hour);
    }
);