import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'router';

export interface CustomRouterState {
    url : string;
    params : Params;
    queryParams : Params;
}

export const ROUTER_INITIAL_STATE : CustomRouterState = {
    url : null,
    params : {},
    queryParams : {}
}

export type CustomRouterReducerState = RouterReducerState<CustomRouterState>;