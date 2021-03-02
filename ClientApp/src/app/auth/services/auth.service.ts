import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoginResponse, LoginModel, RegisterResponse, RegisterModel } from '@auth-models';

@Injectable()
export class AuthService {
    private apiEndpoint : string = '/api/auth';

    constructor(private http: HttpClient) { }

    public Register(model: RegisterModel) : Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiEndpoint}/register`, model).pipe(take(1));
    }

    public Login(model: LoginModel) : Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiEndpoint}/login`, model, { withCredentials : true }).pipe(take(1));
    }

    public RefreshToken() : Observable<{ accessToken : string }> {
        return this.http.get<{ accessToken : string }>(`${this.apiEndpoint}/refresh-token`, { withCredentials : true }).pipe(take(1));
    }

    public IsAuthencticated() : boolean {
        return localStorage.getItem('user') != null;
    }
}
