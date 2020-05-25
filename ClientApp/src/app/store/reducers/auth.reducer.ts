import { createReducer, on } from '@ngrx/store';
import { AuthState, AUTH_INITIAL_STATE } from '@states/auth';
import { User } from 'app/auth/models/user.model';
import { SignUpSuccess, SignInSuccess, SignOut, SignIn, InitUser, GoDenied } from '@actions/auth';

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
    on(InitUser, (state : AuthState) => {
        return { ...state, 
            currentUser : JSON.parse(localStorage.getItem('user')),
            isAuthenticated : localStorage.getItem('user') != null
        };
    }),
    on(GoDenied, (state : AuthState, payload : { reason : string, backUrl : string }) => {
        return { ...state,
            authError : payload.reason,
            backUrl : payload.backUrl
        }
    })
);


