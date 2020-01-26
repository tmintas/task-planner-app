import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CALENDAR_FEATURE_KEY } from '@states/calendar';
import CalendarState from '@states/calendar';

export const feauteSelector = createFeatureSelector<CalendarState>(CALENDAR_FEATURE_KEY)

export const currentMonthDays = createSelector(
    feauteSelector,
    (state : CalendarState) => state.currentMonthDays
)

export const previousMonthDays = createSelector(
    feauteSelector,
    (state : CalendarState) => state.previousMonthDays
)

export const nextMonthDays = createSelector(
    feauteSelector,
    (state : CalendarState) => state.nextMonthDays
)

export const isLoading = createSelector(
    feauteSelector,
    (state : CalendarState) => state.daysLoading
)