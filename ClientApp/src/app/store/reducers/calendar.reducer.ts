import { Action, createReducer, on } from '@ngrx/store';

import CalendarState, * as fromCalendarState from '@states/calendar';
import * as fromCalendarActions from '@actions/calendar';
import * as fromDateFunctions from '@shared-functions/date';
import { Todo } from '@todo-models';
import { CalendarModes } from '@states/calendar';

const reducer = createReducer(
	fromCalendarState.CALENDAR_INITIAL_STATE,
	on(fromCalendarActions.LoadMonthDays, (state : CalendarState, payload : { month : number, year : number }) => {
		return { ...state,
			selectedMonth : payload.month,
			selectedYear : payload.year,
			currentDates : fromDateFunctions.GetMonthDates(payload.year, payload.month),
			previousDates : fromDateFunctions.GetPreviousMonthLastDates(payload.year, payload.month),
			nextDates : fromDateFunctions.GetNextMonthFirstDates(payload.year, payload.month),
			loading : false
		};
	}),
	on(fromCalendarActions.SelectDayToAdd, (state : CalendarState, payload : { date : Date }) => {
		return {
			...state,
			mode : fromCalendarState.CalendarModes.AddTodo,
			selectedDate : payload.date,
			selectedItem : null,
			selectedDayToView : null
		}
	}),
	on(fromCalendarActions.GoNextMonth, (state : CalendarState) => {
		const changeYear = state.selectedMonth === 12;
		const newMonth = changeYear ? 1 : ++state.selectedMonth;
		const newYear = changeYear ? ++state.selectedYear : state.selectedYear;

		return {
			...state,
			selectedItem : null,
			selectedMonth : newMonth,
			selectedYear: newYear,
			currentDates : fromDateFunctions.GetMonthDates(newYear, newMonth),
			previousDates : fromDateFunctions.GetPreviousMonthLastDates(newYear, newMonth),
			nextDates : fromDateFunctions.GetNextMonthFirstDates(newYear, newMonth)
		}
	}),
	on(fromCalendarActions.GoPreviousMonth, (state : CalendarState) => {
		const changeYear = state.selectedMonth === 1;
		const newMonth = changeYear ? 12 : --state.selectedMonth;
		const newYear = changeYear ? --state.selectedYear : state.selectedYear;

		return {
			...state,
			selectedItem : null,
			selectedMonth : newMonth,
			selectedYear: newYear,
			currentDates : fromDateFunctions.GetMonthDates(newYear, newMonth),
			previousDates : fromDateFunctions.GetPreviousMonthLastDates(newYear, newMonth),
			nextDates : fromDateFunctions.GetNextMonthFirstDates(newYear, newMonth)
		}
	}),
	on(fromCalendarActions.GoDefaultMonth, (state : CalendarState) => {
		const month = fromCalendarState.CALENDAR_DEFAULT_MONTH;
		const year = fromCalendarState.CALENDAR_DEFAULT_YEAR;

		return {
			...state,
			selectedItem : null,
			selectedMonth : month,
			selectedYear: year,
			currentDates : fromDateFunctions.GetMonthDates(year, month),
			previousDates : fromDateFunctions.GetPreviousMonthLastDates(year, month),
			nextDates : fromDateFunctions.GetNextMonthFirstDates(year, month)
		}
	}),
	on(fromCalendarActions.SelectDayToView, (state : CalendarState, payload : { date : Date }) => {
		return {
			...state,
			selectedItem : null,
			mode : fromCalendarState.CalendarModes.ViewingItems,
			selectedDate : payload.date,
		}
	}),
	on(fromCalendarActions.SelectItemForEdit, (state : CalendarState, payload : { item : Todo }) => {
		return {
			...state,
			selectedDate : null,
			selectedItem : payload.item,
			mode : fromCalendarState.CalendarModes.EditTodo
		}
	}),
	on(fromCalendarActions.InitFromUrl, (state : CalendarState) => {
		return { 
			...state,
			loading : true
		}
	}),
	on(fromCalendarActions.InitFromUrlSuccess, (state : CalendarState, payload : { day : number, itemId : number, year : number, month : number, mode : CalendarModes }) => {
		return { 
			...state,
			selectedItem : null,
			selectedYear : payload.year,
			selectedMonth : payload.month,
			selectedDate : new Date(payload.year, payload.month - 1, payload.day),
			mode : payload.mode,
		}
	})
);

export function calendarReducer(
	state : CalendarState | undefined,
	action : Action) {
	return reducer(state, action);
}
