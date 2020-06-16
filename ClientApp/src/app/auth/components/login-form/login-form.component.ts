import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import { SignIn } from '@actions/auth';

import { LoginModel } from 'app/auth/models/login.model';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

    public Model : LoginModel = new LoginModel();
    public ErrorMessage : string;

    constructor(
        private store$ : Store<AppState>) { 
            console.log('logi');
            
        }

    public OnSubmit(f: NgForm): void {
        if (f.invalid) { 
            Object.keys(f.controls).forEach(key => f.controls[key].markAsTouched());
            return; 
        }

        this.store$.dispatch(SignIn({ user : f.value }));

        // this.authService.Login(f.value).pipe(
        //     map(
        //         (res : { token : string, error : string }) => {
        //             if (res.error) {
        //                 this.ErrorMessage = res.error;
        //             }
        //             if (res.token) {
        //                 this.store$.dispatch(LoginSuccess({ token : res.token }));
        //             }
        //         },
        //         (err: any) => {
        //             if (err.status && err.status === 400) {
        //                 console.log(err);

        //             } else {
        //                 console.log(err);
        //             }
        //         })
        // ).subscribe();
    }

}
