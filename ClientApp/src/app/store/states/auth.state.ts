import { User } from 'app/auth/models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export const enum AuthFlowState {
    NotAuthorized = "Not Authorized",
    Authorized = "Authorized"
}

export interface AuthState {
    isLoading : boolean,
    loadingMessage : string,
    signUpSuccessMessage : string,
    isAuthenticated: boolean;
    currentUser : User,
    authError : string,
    refreshTokenTimerId : number
}

export const AUTH_INITIAL_STATE: AuthState = {
    isLoading : null,
    loadingMessage : null,
    signUpSuccessMessage : null,
    isAuthenticated: false,
    currentUser : null,
    authError : null,
    refreshTokenTimerId : null
};


