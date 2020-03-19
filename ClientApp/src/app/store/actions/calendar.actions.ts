import { createAction, props } from '@ngrx/store';

export const enum CalendarActionTypes {
    LOAD_TODOS_MONTH_DAYS = '[Calendar] LoadMonthDays',
    SELECT_DAY_ADD = '[Calendar] Select Day to Add Item',
    SELECT_DAY_TO_VIEW = '[Calendar] Select Day to View Items',
    SELECT_ITEM_FOR_EDIT = '[Calendar] Select Item for Edit',
    MOVE_NEXT_MONTH = '[Calendar] Move to Next Month',
    MOVE_PREVIOUS_MONTH = '[Calendar] Move to Previous Month',
    DELETE_TODO_CLICK = '[Calendar] Delete Item Click'
}

export const LoadMonthDays = createAction(CalendarActionTypes.LOAD_TODOS_MONTH_DAYS, props<{ month : number, year : number }>());
export const selectDayToAdd = createAction(CalendarActionTypes.SELECT_DAY_ADD, props<{ day : number }>());
export const selectDayToView = createAction(CalendarActionTypes.SELECT_DAY_TO_VIEW, props<{ day : number }>());

export const goNextMonth = createAction(CalendarActionTypes.MOVE_NEXT_MONTH);
export const goPreviousMonth = createAction(CalendarActionTypes.MOVE_PREVIOUS_MONTH);

export const DeleteTodoClick = createAction(CalendarActionTypes.DELETE_TODO_CLICK, props<{ id : number }>());