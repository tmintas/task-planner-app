import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CALENDAR_FEATURE_KEY } from '@states/calendar';
import CalendarState from '@states/calendar';
import * as fromDateFunctions from '@shared-functions/date';

export const featureSelector = createFeatureSelector<CalendarState>(CALENDAR_FEATURE_KEY);

export const currentMonthDays = createSelector(
	featureSelector,
	(state : CalendarState) => state.currentMonthDays
);

export const previousMonthDays = createSelector(
	featureSelector,
	(state : CalendarState) => state.previousMonthDays
);

export const nextMonthDays = createSelector(
	featureSelector,
	(state : CalendarState) => state.nextMonthDays
);

export const selectedMonth = createSelector(
	featureSelector,
	(state : CalendarState) => state.selectedMonth
);

export const selectedYear = createSelector(
	featureSelector,
	(state : CalendarState) => state.selectedYear
);

export const selectedMonthName = createSelector(
	featureSelector,
	(state : CalendarState) => fromDateFunctions.GetMonthName(state.selectedMonth)
);

export const selectDayToView = createSelector(
	featureSelector,
	(state : CalendarState) => state.selectedDayToView
);