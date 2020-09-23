import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import { SignIn } from '@actions/auth';
import { LoginModel } from '@auth-models';
import { Observable } from 'rxjs';
import * as fromAuthSelectors from '@selectors/auth';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    public Model : LoginModel = new LoginModel();
    public ErrorMessage$ : Observable<string>;
    public LoadingMessage$ : Observable<string> ;
    public IsLoading$ : Observable<boolean>;

    constructor(private store$ : Store<AppState>) { }

    ngOnInit(): void {
        this.ErrorMessage$ = this.store$.select(fromAuthSelectors.authError);
    }

    public OnSubmit(f: NgForm): void {
        if (f.invalid) { 
            Object.values(f.controls).forEach(ctrl => {
                ctrl.markAsTouched();
            });

            (<HTMLInputElement> document.querySelector('input.ng-invalid')).focus();

            return; 
        }

        this.store$.dispatch(SignIn({ user : f.value }));
    }

}
