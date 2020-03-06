import { Action, createReducer, on } from '@ngrx/store';

import CalendarState, * as fromCalendarState from '@states/calendar';
import * as fromCalendarActions from '@actions/calendar';
import * as fromDateFunctions from '@shared-functions/date';
import { Day } from '@month-models';

const calendarReducer = createReducer(
	fromCalendarState.CALENDAR_INITIAL_STATE,
	on(
		fromCalendarActions.LoadMonthDays,
		(state : CalendarState, payload : { month : number, year : number }) => {
			return { ...state,
				previousMonthDays : fromDateFunctions.GetPreviousMonthLastDays(payload.year, payload.month).map(i => new Day(i)),
				currentMonthDays : fromDateFunctions.GetCurrentMonthDays(payload.year, payload.month).map(i => new Day(i)),
				nextMonthDays : fromDateFunctions.GetNextMonthFirstDays(payload.year, payload.month).map(i => new Day(i)),
				selectedMonth : payload.month,
				selectedYear : payload.year,
				loaded : true,
				loading : false
			};
		}
	),
	on(
		fromCalendarActions.selectDayToAdd, 
		(state : CalendarState, payload : { day : number }) => {
			return {
				...state,
				mode : fromCalendarState.CalendarModes.AddTodo,
				selectedDay : payload.day
			}
		}
	),
	on(
		fromCalendarActions.selectItemForEdit, 
		(state : CalendarState, payload : { itemId : number }) => {
			return {
				...state,
				selectedItemId : payload.itemId
			}
		}
	),
	on(
		fromCalendarActions.goNextMonth, 
		(state : CalendarState) => {
			return {
				...state,
				selectedMonth : state.selectedMonth + 1
			}
		}
	),
	on(
		fromCalendarActions.goPreviousMonth, 
		(state : CalendarState) => {
			return {
				...state,
				selectedMonth : state.selectedMonth - 1
			}
		}
	)
);


// tslint:disable-next-line: typedef
export function CalendarReducer(
	state : CalendarState | undefined,
	action : Action) {
	return calendarReducer(state, action);
}
