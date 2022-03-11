import { Action, createReducer, on } from '@ngrx/store';

import CalendarState, * as fromCalendarState from '@states/calendar';
import * as fromCalendarActions from '@actions/calendar';
import * as fromDateFunctions from '@shared-functions/date';
import { Todo } from '@todo-models';
import { CalendarModes } from '@states/calendar';
import { CreateTodoSuccess, UpdateTodoFail, UpdateTodoSuccess } from '@actions/todo';
import { CreateTodoFail } from '@actions/todo';
import { InitCalendarFromUrlStart } from "@actions/calendar";

const reducer = createReducer(
	fromCalendarState.CALENDAR_INITIAL_STATE,
	on(fromCalendarActions.InitMonth, (state : CalendarState, payload : { month : number, year : number, day? : number, mode? : CalendarModes }) => {
		return { ...state,
			selectedMonth : payload.month,
			selectedYear : payload.year,
			selectedDate : payload.day === 0 ? null : new Date(payload.year, payload.month - 1, payload.day),
			mode : payload.mode != null ? payload.mode : CalendarModes.Start,
			currentDates : fromDateFunctions.GetMonthDates(payload.year, payload.month),
			previousDates : fromDateFunctions.GetPreviousMonthLastDates(payload.year, payload.month),
			nextDates : fromDateFunctions.GetNextMonthFirstDates(payload.year, payload.month),
			loading : false
		} as CalendarState;
	}),
	on(fromCalendarActions.SelectDayToAdd, (state : CalendarState, payload : { date : Date }) => {
		return {
			...state,
			mode : fromCalendarState.CalendarModes.AddTodo,
			selectedDate : payload.date,
			selectedDayToView : null
		}
	}),
	on(fromCalendarActions.GoNextMonth, (state : CalendarState) => {
		const changeYear = state.selectedMonth === 12;
		const newMonth = changeYear ? 1 : state.selectedMonth + 1;
		const newYear = changeYear ? state.selectedYear + 1 : state.selectedYear;

		return {
			...state,
			selectedDate : null,
			selectedMonth : newMonth,
			selectedYear: newYear,
			currentDates : fromDateFunctions.GetMonthDates(newYear, newMonth),
			previousDates : fromDateFunctions.GetPreviousMonthLastDates(newYear, newMonth),
			nextDates : fromDateFunctions.GetNextMonthFirstDates(newYear, newMonth)
		}
	}),
	on(fromCalendarActions.GoPreviousMonth, (state : CalendarState) => {
		const changeYear = state.selectedMonth === 1;
		const newMonth = changeYear ? 12 : state.selectedMonth - 1;
		const newYear = changeYear ? state.selectedYear - 1 : state.selectedYear;

		return {
			...state,
			selectedDate : null,
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
			selectedDate : null,
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
			mode : fromCalendarState.CalendarModes.ViewingDayItems,
			selectedDate : payload.date,
		}
	}),
	on(fromCalendarActions.EnterEditMode, (state: CalendarState) => {
		return {
			...state,
			selectedDate : null,
			mode : fromCalendarState.CalendarModes.EditTodo
		}
	}),
	on(CreateTodoSuccess, CreateTodoFail, (state : CalendarState) => {
		return { 
			...state,
			loading : false,
			selectedDate : null
		}
	}),
	on(UpdateTodoFail, UpdateTodoSuccess, (state : CalendarState) => {
		return { 
			...state,
			loading : false,
		}
	}),
	on(InitCalendarFromUrlStart, (state) => {
		return {
			...state,
			loading: true
		};
	})
);

export function calendarReducer(
	state : CalendarState | undefined,
	action : Action) {
	return reducer(state, action);
}
