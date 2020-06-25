import { createReducer } from "@ngrx/store";

import { ROUTER_INITIAL_STATE } from '@states/router';

export const CustomRouteReducer = createReducer(ROUTER_INITIAL_STATE);