import { User } from 'app/auth/models/user.model';
import { Subscription } from 'rxjs';

export const AUTH_FEATURE_KEY = 'auth';

export const enum AuthFlowState {
    NotAuthorized = "Not Authorized",
    Authorized = "Authorized"
}

export interface AuthState {
    isLoading : boolean,
    signUpSuccessMessage : string,
    isAuthenticated: boolean;
    currentUser : User,
    authError : string,
    backUrl : string,
    refreshTokenTimerId : number
}

export const AUTH_INITIAL_STATE: AuthState = {
    isLoading : null,
    signUpSuccessMessage : null,
    isAuthenticated: false,
    currentUser : null,
    authError : null,
    backUrl : null,
    refreshTokenTimerId : null
};


