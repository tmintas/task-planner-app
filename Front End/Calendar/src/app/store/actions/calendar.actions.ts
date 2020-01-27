import { createAction, props } from '@ngrx/store';

export const enum CalendarActionTypes {
    LOAD_DFT_MONTH_DAYS = '[Calendar] LoadMonthDays',
    LOAD_TODOS_MONTH_DAYS = '[Calendar] LoadMonthDays'
}

export const LoadMonthDays = createAction(CalendarActionTypes.LOAD_TODOS_MONTH_DAYS, props<{ month : number, year : number }>());