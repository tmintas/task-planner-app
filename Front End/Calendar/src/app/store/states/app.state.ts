import CalendarState, { CALENDAR_INITIAL_STATE } from './calendar.state';
import ToDoState, { TODO_INITIAL_STATE } from './todo.state';
import * as fromTodoState from '@states/todo';
import * as fromCalendarState from '@states/calendar';

export default interface AppState {
	[fromCalendarState.CALENDAR_FEATURE_KEY] : CalendarState;
	[fromTodoState.TODO_FEATURE_KEY] : ToDoState;
}

export const APP_INITIAL_STATE : AppState = {
	[fromCalendarState.CALENDAR_FEATURE_KEY] : CALENDAR_INITIAL_STATE,
	[fromTodoState.TODO_FEATURE_KEY] : TODO_INITIAL_STATE
};
