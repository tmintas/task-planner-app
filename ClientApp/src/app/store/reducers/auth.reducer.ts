import { createReducer, on, Action } from '@ngrx/store';
import { AuthState, AUTH_INITIAL_STATE } from '@states/auth';
import { User } from 'app/auth/models/user.model';
import { SignUpSuccess, SignInSuccess, SignOut, SignIn, InitUser, GoDenied, InitUserSuccess, InitUserFail } from '@actions/auth';

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
            isLoading : false,
            isAuthenticated : true,
            currentUser : payload.user,
            authError : null
        };
    }),
    on(SignOut, (state : AuthState) => {
        return { ...state, ...AUTH_INITIAL_STATE };
    }),
    on(SignIn, (state : AuthState) => {
        return { ...state, 
            isLoading : true
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
    }),
    // on(RefreshTokenSuccess, (state: AuthState, payload : { newAccessToken : string }) => {
    //     return { 
    //         ...state,  
    //         currentUser : { ...state.currentUser, AccessToken : payload.newAccessToken }
    //     }
    // })
    // on(InitRefreshTimer, () => {
    //     const timerId = setTimeout(this.)
    //     return { ...state,
    //         authError : payload.reason,
    //         backUrl : payload.backUrl
    //     }
    // })
);

export function authReducer(state : AuthState | undefined, action : Action) {
	return reducer(state, action);
}


