import { Action, createReducer, on } from '@ngrx/store';

import CalendarState, * as fromCalendarState from '@states/calendar';
import * as fromCalendarActions from '@actions/calendar';
import * as fromTodoActions from '@actions/todo';
import * as fromDateFunctions from '@shared-functions/date';
import { Day } from 'app/month/models/day.model';

const calendarReducer = createReducer(
	fromCalendarState.CALENDAR_INITIAL_STATE,
	on(
		fromCalendarActions.LoadMonthDays,
		(state : CalendarState, payload : { month : number, year : number }) => {
			return { ...state,
				previousMonthDays : fromDateFunctions.GetPreviousMonthLastDays(payload.year, payload.month).map(i => new Day(i)),
				currentMonthDays : fromDateFunctions.GetCurrentMonthDays(payload.year, payload.month).map(i => new Day(i)),
				nextMonthDays : fromDateFunctions.GetNextMonthFirstDays(payload.year, payload.month).map(i => new Day(i)),
				loaded : true,
				loading : false
			};
		}
	),
	on(fromTodoActions.LoadTodosDay,
		(state : CalendarState, payload : { selectedDay : number }) => {
			return { ...state,
				selectedDay : payload.selectedDay
			};
		}
	),
);

// tslint:disable-next-line: typedef
export function CalendarReducer(
	state : CalendarState | undefined,
	action : Action) {
	return calendarReducer(state, action);
}
