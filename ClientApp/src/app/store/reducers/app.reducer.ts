import { ActionReducerMap } from '@ngrx/store';
import { routerReducer} from "@ngrx/router-store";

import AppState from '@states/app';
import * as fromTodoState from '@states/todo';
import * as fromRouterState from '@states/router';
import * as fromCalendarState from '@states/calendar';
import * as fromAuthState from '@states/auth';
import { authReducer } from '@reducers/auth';
import { todoReducer } from '@reducers/todo';
import { calendarReducer } from '@reducers/calendar'

export const appReducers : ActionReducerMap<AppState> = {
	[fromCalendarState.CALENDAR_FEATURE_KEY] : calendarReducer,
	[fromTodoState.TODO_FEATURE_KEY] : todoReducer,
	[fromAuthState.AUTH_FEATURE_KEY] : authReducer,
	[fromRouterState.ROUTER_FEATURE_KEY] : routerReducer
}