import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as fromRouterState from '@states/router';
import { CalendarModes } from '@states/calendar';
import { CustomRouterState } from '@states/router';
import AppState from '@states/app';

export const selectFeature = createFeatureSelector<AppState, fromRouter.RouterReducerState<any>>(fromRouterState.ROUTER_FEATURE_KEY);

export const selectState = createSelector(
    selectFeature,
    (state) => {
        if (state) return state.state;
        else return null;
    });
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
    (state) => {
        if(state) return toNullOrNumber(state, 'year');
    }
)
export const selectedRoutedItemId = createSelector(
    selectState,
    (state) => state && toNullOrNumber(state, 'itemId')
)
export const backUrl = createSelector(
    selectState,
    (state : CustomRouterState) => state && state.queryParams['backUrl']
)

export const selectedRoutedMode = createSelector(
    selectedRoutedDay,
    selectedRoutedItemId,
    (day, itemId) => {
        if (itemId === 0 && day) return CalendarModes.AddTodo;
        if (itemId === null && day) return CalendarModes.ViewingDayItems;
        if (itemId === null && day === null) return CalendarModes.Start;
        if (itemId && day) return CalendarModes.EditTodo;
    }
)

export const selectCalendarParamsFromUrl = createSelector(
    selectedRoutedYear,
    selectedRoutedMonth,
    selectedRoutedDay,
    selectedRoutedItemId,
    selectedRoutedMode,
    (year, month, day, itemId, mode) => {
        return { year, month, day, itemId, mode }
    }
)

function toNullOrNumber(state : CustomRouterState, paramName : string) : number | null {
    if (!state) return null;
    if (!(paramName in state.params)) return null;

    return +state.params[paramName];
}