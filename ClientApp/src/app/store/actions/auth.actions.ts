import { createAction } from '@ngrx/store';

export const enum AuthActionTypes {
    SIGN_UP_SUCCESS = '[Auth Auto Action] Sign Up Success',
    GO_DENIED = '[Auth Auto Action] Go Denied',
}

export const SignUpSuccess = createAction(
    AuthActionTypes.SIGN_UP_SUCCESS
);

export const GoDenied = createAction(
    AuthActionTypes.GO_DENIED
);


