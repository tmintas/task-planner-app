import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterState } from 'app/shared/utils/custom-router-serializer';
import { RouterReducerState } from '@ngrx/router-store';
import * as fromRouterState from '@states/router';

export type CustomRouterReducerState = RouterReducerState<CustomRouterState>;

export const selectFeature = createFeatureSelector<CustomRouterReducerState>(fromRouterState.ROUTER_FEATURE_KEY);

export const selectState = createSelector(
	selectFeature,
	(state : CustomRouterReducerState) => {
         if (state) return state.state;
         else return null;
    }
)

export const getDateParams = createSelector(
    selectState,
    (state) => { 
        return { 
            year : +state.params['year'],
            month : +state.params['month'],
            day : +state.params['day']
        }
    }
)

export const getSelectedDay = createSelector(
    selectState,
    (state) => +state.params['day']
)