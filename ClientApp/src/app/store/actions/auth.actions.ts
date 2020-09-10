import { createAction, props } from '@ngrx/store';
import { User } from 'app/auth/models/user.model';
import { LoginModel } from '@auth-models';

export const enum AuthActionTypes {
    SIGN_UP_SUCCESS = '[Auth Auto Action] Sign Up Success',
    SIGN_IN = '[Auth User Action] Sign In',
    SIGN_IN_SUCCESS = '[Auth Auto Action] Sign In Success',
    SIGN_IN_FAIL = '[Auth Auto Action] Sign In Fail',
    GO_DENIED = '[Auth Auto Action] Go Denied',
    GO_START = '[Auth Auto Action] Go To Start Page',
    SIGN_OUT = '[Auth User Action] Sign Out',
    INIT_USER = '[Auth Auto Action] Init User',
    INIT_USER_SUCCESS = '[Auth Auto Action] Init User Success',
    INIT_USER_FAIL = '[Auth Auto Action] Init User Fail',
    INIT_REFRESH_TIMER = '[Auth Auto Action] Init Refresh Token Timer',
    INIT_REFRESH_TIMER_SUCCESS = '[Auth Auto Action] Init Refresh Token Timer Success',
    CLEAR_REFRESH_TIMER = '[Auth Auto Action] Clear Refresh Token Timer',
    CLEAR_REFRESH_TIMER_SUCCESS = '[Auth Auto Action] Clear Refresh Token Timer Success',
    REFRESH_TOKEN = '[Auth Auto Action] Refresh Token',
    REFRESH_TOKEN_SUCCESS = '[Auth Auto Action] Refresh Token Success',
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
    AuthActionTypes.SIGN_IN_FAIL,
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

export const InitUserSuccess = createAction(
    AuthActionTypes.INIT_USER_SUCCESS,
    props<{ user : User }>()
);

export const InitUserFail = createAction(
    AuthActionTypes.INIT_USER_FAIL
);

export const InitRefreshTimer = createAction(
    AuthActionTypes.INIT_REFRESH_TIMER
);

export const InitRefreshTimerSuccess = createAction(
    AuthActionTypes.INIT_REFRESH_TIMER_SUCCESS,
    props<{ refreshTokenTimerId : number }>()
);

export const RefreshToken = createAction(
    AuthActionTypes.REFRESH_TOKEN
);

export const RefreshTokenSuccess = createAction(
    AuthActionTypes.REFRESH_TOKEN_SUCCESS,
    props<{ newAccessToken : string }>()
);

export const ClearRefreshTokenTimer = createAction(
    AuthActionTypes.CLEAR_REFRESH_TIMER
);

export const ClearRefreshTokenTimerSuccess = createAction(
    AuthActionTypes.CLEAR_REFRESH_TIMER_SUCCESS
);