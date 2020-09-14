import { createReducer, on, Action } from '@ngrx/store';
import { AuthState, AUTH_INITIAL_STATE } from '@states/auth';
import { User } from 'app/auth/models/user.model';
import { SignUpSuccess, SignInSuccess, SignOut, SignIn, GoDenied, InitUserSuccess, InitUserFail, InitRefreshTimerSuccess, ClearRefreshTokenTimerSuccess } from '@actions/auth';

export const reducer = createReducer(
    AUTH_INITIAL_STATE,
    on(SignUpSuccess, (state : AuthState) => {
        return { ...state, 
            signUpSuccessMessage : 'Sign up succeeded. You can login now' 
        };
    }),
    on(SignInSuccess, (state : AuthState, payload : { user : User }) => {
        return { ...state, 
            signUpSuccessMessage : null,
            loadingMessage : null,
            isLoading : false,
            isAuthenticated : true,
            currentUser : payload.user,
            authError : null
        };
    }),
    on(SignOut, (state : AuthState) => {
        return { ...state, 
            isLoading : null,
            signUpSuccessMessage : null,
            isAuthenticated: null,
            currentUser : null,
            authError : null,
            backUrl : null,
        };
    }),
    on(SignIn, (state : AuthState) => {
        return { ...state, 
            isLoading : true,
            loadingMessage : 'Singing you in...'
        };
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


