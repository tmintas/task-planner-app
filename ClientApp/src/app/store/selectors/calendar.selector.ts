import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CALENDAR_FEATURE_KEY } from '@states/calendar';
import CalendarState from '@states/calendar';
import * as fromDateFunctions from '@shared-functions/date';

export const feauteSelector = createFeatureSelector<CalendarState>(CALENDAR_FEATURE_KEY);

export const currentMonthDays = createSelector(
	feauteSelector,
	(state : CalendarState) => state.currentMonthDays
);

export const previousMonthDays = createSelector(
	feauteSelector,
	(state : CalendarState) => state.previousMonthDays
);

export const nextMonthDays = createSelector(
	feauteSelector,
	(state : CalendarState) => state.nextMonthDays
);

export const selectedMonth = createSelector(
	feauteSelector,
	(state : CalendarState) => state.selectedMonth
);

export const selectedYear = createSelector(
	feauteSelector,
	(state : CalendarState) => state.selectedYear
);

export const selectedMonthName = createSelector(
	feauteSelector,
	(state : CalendarState) => fromDateFunctions.GetMonthName(state.selectedMonth)
);
