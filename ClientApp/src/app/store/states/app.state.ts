import CalendarState from './calendar.state';
import * as fromTodoState from '@states/todo';
import * as fromCalendarState from '@states/calendar';
import { TodosState } from '@states/todo';
import * as fromAuthState from '@states/auth';
import { AuthState } from '@states/auth';

export default interface AppState {
	[fromCalendarState.CALENDAR_FEATURE_KEY] : CalendarState;
	[fromTodoState.TODO_FEATURE_KEY] : TodosState;
	[fromAuthState.AUTH_FEATURE_KEY] : AuthState
}
