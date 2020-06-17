import CalendarState from './calendar.state';
import * as fromTodoState from '@states/todo';
import * as fromRouterState from '@states/router';
import * as fromCalendarState from '@states/calendar';
import { TodosState } from '@states/todo';
import * as fromAuthState from '@states/auth';
import { AuthState } from '@states/auth';
import { CustomRouterState } from '@states/router';
import { RouterReducerState} from "@ngrx/router-store";

export default interface AppState {
	[fromCalendarState.CALENDAR_FEATURE_KEY] : CalendarState;
	[fromTodoState.TODO_FEATURE_KEY] : TodosState;
	[fromAuthState.AUTH_FEATURE_KEY] : AuthState,
	[fromRouterState.ROUTER_FEATURE_KEY] : RouterReducerState<CustomRouterState>
}
