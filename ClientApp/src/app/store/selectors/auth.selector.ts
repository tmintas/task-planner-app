import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from '@states/auth';

export const featureSelector = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getSignupSuccessMessage = createSelector(
    featureSelector,
    state => state.signUpSuccessMessage
)

export const currentUser = createSelector(
    featureSelector,
    state => state.currentUser
)

export const currentUserName = createSelector(
    currentUser,
    user => user && user.UserName
)

export const isAuthenticated = createSelector(
    featureSelector,
    state => state.isAuthenticated
)

export const authError = createSelector(
    featureSelector,
    state => state.authError
)

export const refreshTokenTimerId = createSelector(
    featureSelector,
    state => state.refreshTokenTimerId
)

export const isLoading = createSelector(
    featureSelector,
    state => state.isLoading
)

export const loadingMessage = createSelector(
    featureSelector,
    state => state.loadingMessage
)
