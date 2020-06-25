import { Component } from '@angular/core';
import { RegisterModel } from 'app/auth/models/register.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth/services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RegisterResponse } from 'app/auth/models/register-response.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import * as fromAuthActions from '@actions/auth';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

    public Model : RegisterModel = new RegisterModel();
    public Status : string;

    get diagnostic() { return JSON.stringify(this.Model); }

    constructor(
        private authService : AuthService,
        private router : Router,
        private route : ActivatedRoute,
        private store$ : Store<AppState>
    ) { }

    public OnSubmit(f : NgForm) : void {
        if (f.invalid) {
            f.form.disable();
            return;
        }

        this.authService.Register(f.value).pipe(
            map((r : RegisterResponse) => {
                if (r.Succeeded) {
                    this.store$.dispatch(fromAuthActions.SignUpSuccess());
                    this.router.navigate(['../landing'], { relativeTo : this.route });
                }
                return r;
            }),
            catchError(err => {
                console.log('err');
                console.log(err);
                return of(err);
            })
        ).subscribe();
    }
}
