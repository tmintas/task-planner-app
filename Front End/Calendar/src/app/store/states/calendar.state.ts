import { Day } from '@month-models';

export const CALENDAR_FEATURE_KEY = 'calendar';

export const CALENDAR_INITIAL_STATE = {
    selectedMonth: 1,
    selectedYear: 2019,

    selectedMonthDays : [],
    previousMonthDays : [],
    nextMonthDays : [],
};

export default class CalendarState {
    selectedMonth : number;
    selectedYear : number;

    selectedMonthDays : Day[];
    previousMonthDays : Day[];
    nextMonthDays : Day[];
};