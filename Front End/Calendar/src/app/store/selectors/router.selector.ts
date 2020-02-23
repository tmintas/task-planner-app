import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterState } from 'app/shared/utils/custom-router-serializer';
import { RouterReducerState } from '@ngrx/router-store';

export type CustomRouterReducerState = RouterReducerState<CustomRouterState>;

export const selectFeature = createFeatureSelector<CustomRouterReducerState>('router');

export const selectState = createSelector(
	selectFeature,
	(state : CustomRouterReducerState) => state.state
)

export const getDateParamsFromRoute = createSelector(
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