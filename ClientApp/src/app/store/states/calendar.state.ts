import { Todo } from '@todo-models';

export const CALENDAR_FEATURE_KEY = 'calendar';
export const CALENDAR_DEFAULT_MONTH : number = new Date().getMonth() + 1; // month is 1-based
export const CALENDAR_DEFAULT_YEAR : number = new Date().getFullYear();

export enum CalendarModes {
	Start = 0,
	EditTodo = 1,
	AddTodo = 2,
	ViewingDayItems = 3
}

export default class CalendarState {
	selectedMonth : number;
	selectedYear : number;
	selectedItem : Todo;
	mode : CalendarModes;
	loading : boolean;

	selectedDate : Date;
	previousDates : Date[];
	currentDates : Date[];
	nextDates : Date[];
}

export const CALENDAR_INITIAL_STATE = {
	selectedMonth: null,
	selectedYear: null,
	selectedItem : null,
	mode : null,
	loading : null,

	selectedDate : null,
	previousDates : [],
	currentDates : [],
	nextDates : [],
};