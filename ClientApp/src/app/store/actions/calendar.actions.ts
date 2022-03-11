import { createAction, props } from '@ngrx/store';
import { Todo } from '@todo-models';
import { CalendarModes } from '@states/calendar';

export const enum CalendarActionTypes {
    // user initiated actions
    SELECT_DAY_TO_ADD_ITEM = '[Calendar User Action] Select Day to Add Item',
    SELECT_DAY_TO_VIEW = '[Calendar User Action] Select Day to View Items',
    ENTER_EDIT_MODE = '[Calendar User Action] Enter Edit Mode',
    MOVE_NEXT_MONTH = '[Calendar User Action] Move to Next Month',
    MOVE_PREVIOUS_MONTH = '[Calendar User Action] Move to Previous Month',
    MOVE_DEFAULT_MONTH = '[Calendar Effect Action] Move to Default Month',
    INIT_MONTH = '[Calendar Effect Action] Init Month',
    INIT_CALENDAR_FROM_URL_START = '[Calendar] Init Calendar From URL Start',
}

export const SelectDayToAdd = createAction(CalendarActionTypes.SELECT_DAY_TO_ADD_ITEM, props<{ date : Date }>());
export const SelectDayToView = createAction(CalendarActionTypes.SELECT_DAY_TO_VIEW, props<{ date : Date }>());
export const EnterEditMode = createAction(CalendarActionTypes.ENTER_EDIT_MODE);
export const GoNextMonth = createAction(CalendarActionTypes.MOVE_NEXT_MONTH);
export const GoPreviousMonth = createAction(CalendarActionTypes.MOVE_PREVIOUS_MONTH);
export const GoDefaultMonth = createAction(CalendarActionTypes.MOVE_DEFAULT_MONTH);
export const InitCalendarFromUrlStart = createAction(CalendarActionTypes.INIT_CALENDAR_FROM_URL_START);
export const InitMonth = createAction(CalendarActionTypes.INIT_MONTH, props<{ year : number, month : number, day? : number, mode? : CalendarModes }>());
