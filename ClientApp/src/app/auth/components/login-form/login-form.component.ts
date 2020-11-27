import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import AppState from '@states/app';
import * as fromAuthActions from '@actions/auth';
import { LoginModel } from '@auth-models';
import * as fromAuthSelectors from '@selectors/auth';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    public Model : LoginModel = new LoginModel();
    public ErrorMessage$ : Observable<string>;

    constructor(private store$ : Store<AppState>) { }

    ngOnInit(): void {
        this.ErrorMessage$ = this.store$.select(fromAuthSelectors.authError);
    }

    public OnSubmit(f: NgForm): void {
        if (f.invalid) {
            Object.values(f.controls).forEach(ctrl => ctrl.markAsTouched());
            
            return;
        }

        this.store$.dispatch(fromAuthActions.SignIn({ user : f.value }));
    }
}
