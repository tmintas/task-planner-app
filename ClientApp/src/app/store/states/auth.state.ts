import { User } from 'app/auth/models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
    isLoading : boolean,
    loadingMessage : string,
    statusMessage : string,
    isAuthenticated: boolean;
    currentUser : User,
    authError : string,
    refreshTokenTimerId : number
}

export const AUTH_INITIAL_STATE: AuthState = {
    isLoading : null,
    loadingMessage : null,
    statusMessage : null,
    isAuthenticated: false,
    currentUser : null,
    authError : null,
    refreshTokenTimerId : null
};


