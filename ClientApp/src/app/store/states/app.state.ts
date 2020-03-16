import CalendarState from './calendar.state';
import * as fromTodoState from '@states/todo';
import * as fromCalendarState from '@states/calendar';
import { TodosState } from '@reducers/todo';

export default interface AppState {
	[fromCalendarState.CALENDAR_FEATURE_KEY] : CalendarState;
	[fromTodoState.TODO_FEATURE_KEY] : TodosState;
}
