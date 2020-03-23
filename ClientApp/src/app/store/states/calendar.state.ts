import { Day } from '@month-models';

export const CALENDAR_FEATURE_KEY = 'calendar';

export enum CalendarModes {
	Start,
	EditTodo,
	AddTodo
}

export const CALENDAR_INITIAL_STATE = {
	selectedMonth: 1,
	selectedYear: 2019,
	selectedDayToView: null,
	mode : CalendarModes.Start,

	currentMonthDays : [],
	previousMonthDays : [],
	nextMonthDays : []
};

export default class CalendarState {
	public selectedMonth : number;
	public selectedDayToView : number;
	public selectedYear : number;
	public mode : CalendarModes;

	public currentMonthDays : Day[];
	public previousMonthDays : Day[];
	public nextMonthDays : Day[];
}

