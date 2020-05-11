import { createSelector, createFeatureSelector } from '@ngrx/store';
import CalendarState, { CALENDAR_FEATURE_KEY } from '@states/calendar';
import * as fromDateFunctions from '@shared-functions/date';
import * as fromRouterState from '@states/router';
import { CustomRouterReducerState } from './router.selector';

export const featureSelector = createFeatureSelector<CalendarState>(CALENDAR_FEATURE_KEY);
export const selectRouteFeature = createFeatureSelector<CustomRouterReducerState>(fromRouterState.ROUTER_FEATURE_KEY);

export const selectedMonth = createSelector(
	featureSelector,
	state => state.selectedMonth
);

export const selectedYear = createSelector(
	featureSelector,
	(state : CalendarState) => state.selectedYear
);

export const selectedMonthName = createSelector(
	featureSelector,
	(state : CalendarState) => fromDateFunctions.GetMonthName(state.selectedMonth)
);

export const selectedCurrentDates = createSelector(
	featureSelector,
	(state : CalendarState) =>  {
		return state.currentDates.map(ds => new Date(ds));
	}
)

export const selectedPreviousDates = createSelector(
	featureSelector,
	(state : CalendarState) =>  {
		return state.previousDates.map(ds => new Date(ds));
	}
)

export const selectedNextDates = createSelector(
	featureSelector,
	(state : CalendarState) =>  {
		return state.nextDates.map(ds => new Date(ds));
	}
)

export const selectedMonthDaysWithNeighbors = createSelector(
	selectedPreviousDates,
	selectedCurrentDates,
	selectedNextDates,
	(prev, cur, next) => {
		return ([ ...prev, ...cur, ...next ]).map(el => new Date(el));
	}
)

export const selectedTodo = createSelector(
    featureSelector, 
	(state : CalendarState) => state.selectedItem
);

export const selectedDate = createSelector(
	featureSelector,
	state => state.selectedDate
)

export const selectedMode = createSelector(
	featureSelector,
	state => state.mode
)