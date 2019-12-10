
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ItemType } from '@todo-enums';
import ToDoState, { todoFeatureKey } from '@states/todo';

export const selectAllTodos = (state: ToDoState) => state.items;

export const selectFeature = createFeatureSelector(todoFeatureKey);

export const selectTodosByMonthAndDay = createSelector(
    selectFeature,
    (state: ToDoState, props: { month: number, day: number }) => {
        return state.items
            .filter(i => i.Date.month === props.month && i.Date.day === props.day)
            .sort((next, prev) => {
                //put todos without time to the end
                if (next.Type === ItemType.UndefiniteTime) return 1;
                if (prev.Type === ItemType.UndefiniteTime) return -1;
                return next.Time.hour - prev.Time.hour;
            });
    }
);