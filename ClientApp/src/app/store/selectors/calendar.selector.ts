import { createSelector, createFeatureSelector } from '@ngrx/store';
import CalendarState, { CALENDAR_FEATURE_KEY } from '@states/calendar';
import * as fromDateFunctions from '@shared-functions/date';
import * as fromRouterState from '@states/router';
import { CustomRouterReducerState } from './router.selector';

export const featureSelector = createFeatureSelector<CalendarState>(CALENDAR_FEATURE_KEY);
export const selectRouteFeature = createFeatureSelector<CustomRouterReducerState>(fromRouterState.ROUTER_FEATURE_KEY);

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
	selectRouteFeature,
	customRoute => +customRoute.state.params['month']
);

export const selectedMonthAndYear = createSelector(
	featureSelector,
	state => {  
		return { month : state.selectedMonth, year : state.selectedYear } 
	}
);

export const selectedYear = createSelector(
	featureSelector,
	(state : CalendarState) => state.selectedYear
);

export const selectedMonthName = createSelector(
	featureSelector,
	(state : CalendarState) => fromDateFunctions.GetMonthName(state.selectedMonth)
);

export const SelectDayToView = createSelector(
	featureSelector,
	(state : CalendarState) => state.selectedDayToView
);