import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from '@states/auth';

export const featureSelector = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getSignupSuccessMessage = createSelector(
    featureSelector,
    state => state.signUpSuccessMessage
)