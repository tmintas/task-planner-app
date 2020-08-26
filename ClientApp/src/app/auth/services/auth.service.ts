import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register-response.model';
import { LoginModel } from '../models/login.model';
import { take } from 'rxjs/operators';
import { LoginResponse } from '@auth-models';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService {
    private apiEndpoint : string = environment.apiUrl + '/api/auth';
    
    constructor(private http: HttpClient) { }

    public Register(model: RegisterModel) : Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiEndpoint}/register`, model).pipe(take(1));
    }

    public Login(model: LoginModel) : Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiEndpoint}/login`, model, { withCredentials : true }).pipe(take(1));
    }

    public RefreshToken() : Observable<string> {
        return this.http.get<string>(`${this.apiEndpoint}/refresh-token`, { withCredentials : true }).pipe(take(1));
    }

    public IsAuthencticated() : boolean {
        return localStorage.getItem('user') != null;
    }
}
