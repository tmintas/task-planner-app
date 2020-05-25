import { createAction, props } from '@ngrx/store';
import { LoginModel } from 'app/auth/models/login.model';
import { User } from 'app/auth/models/user.model';

export const enum AuthActionTypes {
    SIGN_UP_SUCCESS = '[Auth Auto Action] Sign Up Success',
    SIGN_IN = '[Auth User Action] Sign In',
    SIGN_IN_SUCCESS = '[Auth Auto Action] Sign In Success',
    SIGN_IN_FAIL = '[Auth Auto Action] Sign In Fail',
    GO_DENIED = '[Auth Auto Action] Go Denied',
    GO_START = '[Auth Auto Action] Go To Start Page',
    SIGN_OUT = '[Auth User Action] Sign Out',
    INIT_USER = '[Auth Auto Action] Init User',
}

export const SignUpSuccess = createAction(
    AuthActionTypes.SIGN_UP_SUCCESS
);

export const SignIn = createAction(
    AuthActionTypes.SIGN_IN,
    props<{ user : LoginModel}>()
);

export const SignInSuccess = createAction(
    AuthActionTypes.SIGN_IN_SUCCESS,
    props<{ user : User }>()
);

export const SignInFail = createAction(
    AuthActionTypes.SIGN_IN_SUCCESS,
    props<{ error : string }>()
);

export const GoDenied = createAction(
    AuthActionTypes.GO_DENIED,
    props<{ reason : string, backUrl : string }>()
);

export const GoStart = createAction(
    AuthActionTypes.GO_START
);

export const SignOut = createAction(
    AuthActionTypes.SIGN_OUT
);

export const InitUser = createAction(
    AuthActionTypes.INIT_USER
);