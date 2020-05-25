import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegisterResponse } from '../models/register-response.model';
import { LoginModel } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    SaveUser(user: User) {
        throw new Error("Method not implemented.");
    }
    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User> = this.currentUserSubject.asObservable();
    
    constructor(private http: HttpClient) {
        // this.
    }

    public Register(model: RegisterModel) : Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>('http://localhost:62664/api/ApplicationUser/register', model);
    }

    public Login(model: LoginModel) : Observable<{ token : string, error? : string, userName : string }> {
        return this.http.post<{ token : string, error? : string, userName : string }>('http://localhost:62664/api/ApplicationUser/login', model);
    }

    public IsAuthencticated() : boolean {
        return localStorage.getItem('user') != null;
    }
}
