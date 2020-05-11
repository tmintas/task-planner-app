import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register-response.model';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    public Register(model: RegisterModel) : Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>('http://localhost:62664/api/ApplicationUser/register', model);
    }

    public Login(model: RegisterModel) : Observable<{ token : string, error : string }> {
        return this.http.post<{ token : string, error : string }>('http://localhost:62664/api/ApplicationUser/login', model);
    }

    public IsAuthencticated() : boolean {
        return localStorage.getItem('token') != null;
    }
}
