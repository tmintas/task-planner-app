import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import AppState from '@states/app';
import * as fromAuthActions from '@actions/auth';
import { RegisterModel } from '@auth-models';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
    public Model : RegisterModel = new RegisterModel();

    constructor(private store$ : Store<AppState>) { }

    public OnSubmit(f : NgForm) : void {
        if (f.invalid) {
            Object.values(f.controls).forEach(ctrl => ctrl.markAsTouched());

            return;
        }

        this.store$.dispatch(fromAuthActions.SignUp({ model : this.Model }));
    }
}
