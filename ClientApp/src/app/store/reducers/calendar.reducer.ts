import { Action, createReducer, on } from '@ngrx/store';

import CalendarState, * as fromCalendarState from '@states/calendar';
import * as fromCalendarActions from '@actions/calendar';
import * as fromDateFunctions from '@shared-functions/date';
import { Day } from '@month-models';
import { Todo } from '@todo-models';

const calendarReducer = createReducer(
	fromCalendarState.CALENDAR_INITIAL_STATE,
	on(fromCalendarActions.LoadMonthDays, (state : CalendarState, payload : { month : number, year : number }) => {
		console.log(payload.month);
		
		return { ...state,
			previousMonthDays : fromDateFunctions.GetPreviousMonthLastDays(payload.year, payload.month).map(i => new Day(i)),
			currentMonthDays : fromDateFunctions.GetCurrentMonthDays(payload.year, payload.month).map(i => new Day(i)),
			nextMonthDays : fromDateFunctions.GetNextMonthFirstDays(payload.year, payload.month).map(i => new Day(i)),

			currentDates : fromDateFunctions.GetMonthDates(payload.year, payload.month),
			previousDates : fromDateFunctions.GetPreviousMonthLastDates(payload.year, payload.month),
			nextDates : fromDateFunctions.GetNextMonthFirstDates(payload.year, payload.month)
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
	on(fromCalendarActions.InitMonthToView, (state : CalendarState, payload : { month : number, year : number }) => {
		return {
			...state,
			selectedMonth : payload.month,
			selectedYear : payload.year,
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
			selectedDay : null,
			selectedItem : payload.item,
			mode : fromCalendarState.CalendarModes.EditTodo
		}
	})
);

// tslint:disable-next-line: typedef
export function CalendarReducer(
	state : CalendarState | undefined,
	action : Action) {
	return calendarReducer(state, action);
}
