import CalendarState from './calendar.state';
import * as fromTodoState from '@states/todo';
import * as fromCalendarState from '@states/calendar';
import { TodosState } from '@reducers/todo';

export default interface AppState {
	[fromCalendarState.CALENDAR_FEATURE_KEY] : CalendarState;
	[fromTodoState.TODO_FEATURE_KEY] : TodosState;
}

// export const APP_INITIAL_STATE : AppState = {
// 	[fromCalendarState.CALENDAR_FEATURE_KEY] : CALENDAR_INITIAL_STATE,
// 	[fromTodoState.TODO_FEATURE_KEY] : TODO_INITIAL_STATE,
// };
