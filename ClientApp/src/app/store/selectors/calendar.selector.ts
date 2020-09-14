import { createSelector, createFeatureSelector } from '@ngrx/store';

import CalendarState, { CALENDAR_FEATURE_KEY } from '@states/calendar';
import * as fromDateFunctions from '@shared-functions/date';
import { Todo } from '@todo-models';

export const featureSelector = createFeatureSelector<CalendarState>(CALENDAR_FEATURE_KEY);

export const selectedMonth = createSelector(
	featureSelector,
	state => state.selectedMonth
);

// TODO remove
export const daysLoaded = createSelector(
	featureSelector,
	state => state.loading === false
);

export const isLoading = createSelector(
	featureSelector,
	state => state.loading
);

export const loadingMessage = createSelector(
	featureSelector,
	state => state.loadingMessage
);

export const isMonthSelected = createSelector(
	featureSelector,
	(state : CalendarState, props) => state.selectedMonth === props.month + 1
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
		return ([ ...prev, ...cur, ...next ]);
	}
)

export const selectedTodo = createSelector(
    featureSelector, 
	(state : CalendarState) => state.selectedItem
);

export const isItemEditing = createSelector(
    selectedTodo, 
	(item : Todo, props) => item && props && item.id === props.id
);

export const selectedDate = createSelector(
	featureSelector,
	state => state.selectedDate
)

export const selectedDayNumber = createSelector(
	selectedDate,
	date => date && date.getDate()
)

export const selectedMode = createSelector(
	featureSelector,
	state => state.mode
)

export const isDayInMode = createSelector(
	selectedMode,
	selectedDate,
	(mode, date, props) => {
		return date && props.date && mode == props.mode && date.getDate() == props.date.getDate()
	}
)