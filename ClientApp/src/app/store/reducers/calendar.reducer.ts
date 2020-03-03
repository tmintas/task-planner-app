import { Action, createReducer, on } from '@ngrx/store';

import CalendarState, * as fromCalendarState from '@states/calendar';
import * as fromCalendarActions from '@actions/calendar';

import { Day } from '@month-models';
import * as fromDateFunctions from '@shared-functions/date';

const calendarReducer = createReducer(
	fromCalendarState.CALENDAR_INITIAL_STATE,
	on(
		fromCalendarActions.LoadMonthDays, 
		(state : CalendarState, payload : { month : number, year : number }) => 
		{
            return { ...state, 
                previousMonthDays : fromDateFunctions.GetPreviousMonthLastDays(payload.year, payload.month).map(i => new Day(i)),
                selectedMonthDays : fromDateFunctions.GetCurrentMonthDays(payload.year, payload.month).map(i => new Day(i)),
                nextMonthDays : fromDateFunctions.GetNextMonthFirstDays(payload.year, payload.month).map(i => new Day(i)),
            };
		}
	)
)
		
export function CalendarReducer(
	state : CalendarState | undefined, 
	action : Action) {
	return calendarReducer(state, action)
}