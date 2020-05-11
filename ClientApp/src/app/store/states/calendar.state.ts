import { Todo } from '@todo-models';

export const CALENDAR_FEATURE_KEY = 'calendar';
// month is 1-based
export const CALENDAR_DEFAULT_MONTH : number = new Date().getMonth() + 1;
export const CALENDAR_DEFAULT_YEAR : number = new Date().getFullYear();

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

	previousDates : null,
	currentDates : [],
	nextDates : null,
};

export default class CalendarState {
	selectedMonth : number;
	selectedDay : number;
	selectedYear : number;
	selectedItem : Todo;
	mode : CalendarModes;

	selectedDate : Date;
	previousDates : Date[];
	currentDates : Date[];
	nextDates : Date[];
}

