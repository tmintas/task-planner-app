import { ROUTER_INITIAL_STATE } from '../states/router.state';

import { createReducer } from "@ngrx/store";

export const CustomRouteReducer = createReducer(ROUTER_INITIAL_STATE);
