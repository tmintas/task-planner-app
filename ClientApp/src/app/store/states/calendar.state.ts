import { Day } from '@month-models';
import { Todo } from '@todo-models';

export const CALENDAR_FEATURE_KEY = 'calendar';

export enum CalendarModes {
	Start,
	EditTodo,
	AddTodo,
	ViewingItems
}

export const CALENDAR_INITIAL_STATE = {
	selectedMonth: 1,
	selectedYear: 2019,
	selectedDay: null,
	mode : CalendarModes.Start,

	currentMonthDays : [],
	previousMonthDays : [],
	nextMonthDays : [],

	previousDates : null,
	currentDates : [],
	nextDates : null,
};

export default class CalendarState {
	public selectedMonth : number;
	public selectedDay : number;
	public selectedYear : number;
	public selectedItem : Todo;
	public mode : CalendarModes;
	public selectedDate : Date;

	public currentMonthDays : Day[];
	public previousMonthDays : Day[];
	public nextMonthDays : Day[];

	public previousDates : string[];
	public currentDates : string[];
	public nextDates : string[];
}

