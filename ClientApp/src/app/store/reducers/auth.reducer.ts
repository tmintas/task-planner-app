import { createReducer, on, Action } from '@ngrx/store';

import { User } from 'app/auth/models/user.model';
import { AuthState, AUTH_INITIAL_STATE } from '@states/auth';
import { SignUpSuccess, SignInSuccess, SignOut, SignIn, GoDenied, InitUserSuccess, InitUserFail, InitRefreshTimerSuccess, 
        ClearRefreshTokenTimerSuccess, SignInFail, SignUpFail, SignUp } from '@actions/auth';

export const reducer = createReducer(
    AUTH_INITIAL_STATE,
    on(SignIn, SignUp, (state : AuthState) => {
        return { ...state, isLoading: true }
    }),
    on(SignInSuccess, (state : AuthState, payload : { user : User }) => {
        return { ...state, 
            statusMessage : null,
            loadingMessage : null,
            isAuthenticated : true,
            currentUser : payload.user,
            authError : null
        };
    }),
    on(SignUpSuccess, (state : AuthState) => {
        return { ...state, statusMessage : 'Sign up succeeded. You can login now' };
    }),
    on(SignInFail, (state : AuthState) => {
        return { ...state, statusMessage : 'Sign in failed, please try again later..' };
    }),
    on(SignUpFail, (state : AuthState) => {
        return { ...state, statusMessage : 'Sign up failed, please try again later..' };
    }),
    on(SignInFail, SignUpFail, SignUpSuccess, SignInSuccess, (state : AuthState) => {
        return { ...state, isLoading: false, loadingMessage: null }
    }),
    on(SignOut, (state : AuthState) => {
        return { ...state, 
            statusMessage : null,
            isAuthenticated: null,
            currentUser : null,
            authError : null,
            backUrl : null,
        };
    }),
    on(SignIn, (state : AuthState) => {
        return { ...state, loadingMessage : 'Singing you in...' };
    }),
    on(SignUp, (state : AuthState) => {
        return { ...state, loadingMessage : 'Creating a user...' };
    }),
    on(InitUserSuccess, (state : AuthState, payload : { user : User }) => {
        return { ...state, 
            currentUser : payload.user,
            isAuthenticated : true
        };
    }),
    on(InitUserFail, (state : AuthState) => {
        return { ...state, 
            currentUser : null,
            isAuthenticated : false
        };
    }),
    on(GoDenied, (state : AuthState, payload : { reason : string, backUrl : string }) => {
        return { ...state,
            authError : payload.reason,
            backUrl : payload.backUrl
        }
    }) ,
    on(InitRefreshTimerSuccess, (state : AuthState, payload : { refreshTokenTimerId : number }) => {
        return { ...state,
            refreshTokenTimerId : payload.refreshTokenTimerId
        }
    }),
    on(ClearRefreshTokenTimerSuccess, (state : AuthState) => {
        return { ...state,
            refreshTokenTimerId : null
        }
    }),
);

export function authReducer(state : AuthState | undefined, action : Action) {
	return reducer(state, action);
}


