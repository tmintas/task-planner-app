import { createAction, props } from '@ngrx/store';
import { Todo } from '@todo-models';
import { CalendarModes } from '@states/calendar';

export const enum CalendarActionTypes {
    // angular components initiated actions 
    INIT_FROM_URL = '[Calendar Auto Action] Init From URL',
    
    // user initiated actions
    SELECT_DAY_TO_ADD_ITEM = '[Calendar User Action] Select Day to Add Item',
    SELECT_DAY_TO_VIEW = '[Calendar User Action] Select Day to View Items',
    SELECT_ITEM_FOR_EDIT = '[Calendar User Action] Select Item for Edit',
    MOVE_NEXT_MONTH = '[Calendar User Action] Move to Next Month',
    MOVE_PREVIOUS_MONTH = '[Calendar User Action] Move to Previous Month',
    MOVE_DEFAULT_MONTH = '[Calendar Effect Action] Move to Default Month',
    
    // actions called in effects 
    INIT_MONTH = '[Calendar Effect Action] Init Month',
    INIT_FROM_URL_SUCCESS = '[Calendar Effect Action] Init From URL Success',
}

// month number should be 1-based, e.g. - march is 3
// export const InitMonthToView = createAction(CalendarActionTypes.INIT_MONTH_TO_VIEW, props<{ month : number, year : number }>());
export const SelectDayToAdd = createAction(CalendarActionTypes.SELECT_DAY_TO_ADD_ITEM, props<{ date : Date }>());
export const SelectDayToView = createAction(CalendarActionTypes.SELECT_DAY_TO_VIEW, props<{ date : Date }>());
export const SelectItemForEdit = createAction(CalendarActionTypes.SELECT_ITEM_FOR_EDIT, props<{ item : Todo }>());
export const GoNextMonth = createAction(CalendarActionTypes.MOVE_NEXT_MONTH);
export const GoPreviousMonth = createAction(CalendarActionTypes.MOVE_PREVIOUS_MONTH);
export const GoDefaultMonth = createAction(CalendarActionTypes.MOVE_DEFAULT_MONTH);

export const InitFromUrl = createAction(CalendarActionTypes.INIT_FROM_URL);
export const InitMonth = createAction(CalendarActionTypes.INIT_MONTH, props<{ year : number, month : number, day? : number, todo? : Todo, mode? : CalendarModes }>());
