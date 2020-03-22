import { createAction, props } from '@ngrx/store';
import { Todo } from '@todo-models';

export const enum CalendarActionTypes {
    // angular components initiated actions 
    INIT_FROM_URL = '[Calendar Auto Action] Init From URL',

    // user initiated actions
    SELECT_DAY_TO_ADD_ITEM = '[Calendar User Action] Select Day to Add Item',
    SELECT_DAY_TO_VIEW = '[Calendar User Action] Select Day to View Items',
    SELECT_ITEM_FOR_EDIT = '[Calendar User Action] Select Item for Edit',
    MOVE_NEXT_MONTH = '[Calendar User Action] Move to Next Month',
    MOVE_PREVIOUS_MONTH = '[Calendar User Action] Move to Previous Month',
	DELETE_TODO_CLICK = '[Calendar User Action] Delete Todo Start',
	SUBMIT_TODO_CLICK = '[Calendar User Action] Submit Todo',

    // actions called in effects 
    SELECT_MONTH_TO_VIEW = '[Calendar Effect Action] Select Month to View',
    LOAD_MONTH_DAYS = '[Calendar Effect Action] Load Month Days',
}

export const InitMonthToView = createAction(CalendarActionTypes.SELECT_MONTH_TO_VIEW, props<{ month : number, year : number }>());
export const selectDayToView = createAction(CalendarActionTypes.SELECT_DAY_TO_VIEW, props<{ day : number }>());
export const SelectItemForEdit = createAction(CalendarActionTypes.SELECT_ITEM_FOR_EDIT, props<{ item : Todo }>());
export const GoNextMonth = createAction(CalendarActionTypes.MOVE_NEXT_MONTH);
export const GoPreviousMonth = createAction(CalendarActionTypes.MOVE_PREVIOUS_MONTH);
export const DeleteTodoClick = createAction(CalendarActionTypes.DELETE_TODO_CLICK, props<{ id : number }>());
export const SubmitTodo = createAction(CalendarActionTypes.SUBMIT_TODO_CLICK , props<{ item : Todo }>());

export const InitFromUrl = createAction(CalendarActionTypes.INIT_FROM_URL);
export const LoadMonthDays = createAction(CalendarActionTypes.LOAD_MONTH_DAYS, props<{ month : number, year : number }>());
export const selectDayToAdd = createAction(CalendarActionTypes.SELECT_DAY_TO_ADD_ITEM, props<{ day : number }>());
