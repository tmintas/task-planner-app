import { Day } from '@month-models';

export const CALENDAR_FEATURE_KEY = 'calendar';

export const CALENDAR_INITIAL_STATE = {
	selectedMonth: 1,
	selectedYear: 2019,
	selectedDay: 0,

	currentMonthDays : [],
	previousMonthDays : [],
	nextMonthDays : []
};

export default class CalendarState {
	public selectedMonth : number;
	public selectedDay : number;
	public selectedYear : number;

	public currentMonthDays : Day[];
	public previousMonthDays : Day[];
	public nextMonthDays : Day[];
}

