import * as fromTodos from './todo.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    todo : fromTodos.State
}

export const appReducer: ActionReducerMap<AppState> = {
    todo: fromTodos.reducer
}