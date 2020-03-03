import CalendarState, { CALENDAR_INITIAL_STATE } from './calendar.state';
import ToDoState, { TODO_INITIAL_STATE } from './todo.state';

export default class AppState {
	public 'calendar' : CalendarState;
	public 'todos' : ToDoState;
}

export const APP_INITIAL_STATE : AppState = {
	calendar : CALENDAR_INITIAL_STATE,
	todos : TODO_INITIAL_STATE
};
