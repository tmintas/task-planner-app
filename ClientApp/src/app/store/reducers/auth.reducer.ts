import { createReducer, on } from '@ngrx/store';
import * as fromAuthActions from '@actions/auth';
import { AuthState, AUTH_INITIAL_STATE } from '@states/auth';

export const reducer = createReducer(
    AUTH_INITIAL_STATE,
    on(fromAuthActions.SignUpSuccess, (state : AuthState) => {
        return { ...state, 
            signUpSuccessMessage : 'Sign up succeeded. You can login now' 
        };
    }),
);

