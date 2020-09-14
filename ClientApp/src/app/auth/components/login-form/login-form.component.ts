import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import { SignIn } from '@actions/auth';
import { LoginModel } from '@auth-models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

    public Model : LoginModel = new LoginModel();
    public ErrorMessage : string;
    public LoadingMessage$ : Observable<string> ;
    public IsLoading$ : Observable<boolean>;

    constructor(
        private store$ : Store<AppState>) { 
        }

    public OnSubmit(f: NgForm): void {
        if (f.invalid) { 
            Object.keys(f.controls).forEach(key => f.controls[key].markAsTouched());
            return; 
        }

        this.store$.dispatch(SignIn({ user : f.value }));
    }

}
