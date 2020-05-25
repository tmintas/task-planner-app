import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterState } from 'app/shared/utils/custom-router-serializer';
import { RouterReducerState } from '@ngrx/router-store';
import * as fromRouterState from '@states/router';
import { CalendarModes } from '@states/calendar';

export type CustomRouterReducerState = RouterReducerState<CustomRouterState>;

export const selectFeature = createFeatureSelector<CustomRouterReducerState>(fromRouterState.ROUTER_FEATURE_KEY);

export const selectState = createSelector(
    selectFeature,
    (state: CustomRouterReducerState) => {
        if (state) return state.state;
        else return null;
    }
)

export const selectedRoutedDay = createSelector(
    selectState,
    (state) => state && toNullOrNumber(state, 'day')
);
export const selectedRoutedMonth = createSelector(
    selectState,
    (state) => state && toNullOrNumber(state, 'month')
)
export const selectedRoutedYear = createSelector(
    selectState,
    (state) => state && toNullOrNumber(state, 'year')
)
export const selectedRoutedItemId = createSelector(
    selectState,
    (state) => state && toNullOrNumber(state, 'itemId')
)
export const selectedRoutedMode = createSelector(
    selectedRoutedDay,
    selectedRoutedItemId,
    (day, itemId) => {
        if (itemId === 0 && day) return CalendarModes.AddTodo;
        if (itemId === null && day) return CalendarModes.ViewingItems;
        if (itemId === null && day === null) return CalendarModes.Start;
        if (itemId && day) return CalendarModes.EditTodo;
    }
)

function toNullOrNumber(state : any, paramName : string) : number | null {
    if (!(paramName in state.params)) return null;

    return +state.params[paramName];
}