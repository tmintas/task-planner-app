import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from 'app/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginModel } from 'app/auth/models/login.model';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

    public Model : LoginModel = new LoginModel();
    public ErrorMessage : string;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    public OnSubmit(f: NgForm): void {
        if (f.invalid) {
            f.form.disable();
            return;
        }

        this.authService.Login(f.value).pipe(
            map(
                (res : { token : string, error : string }) => {
                    if (res.error) {
                        this.ErrorMessage = res.error;
                    }
                    if (res.token) {
                        localStorage.setItem('token', res.token);
                        this.router.navigate(['../home'], { relativeTo: this.route });
                    }
                },
                (err: any) => {
                    if (err.status && err.status === 400) {
                        console.log(err);

                    } else {
                        console.log(err);
                    }
                })
        ).subscribe();
    }

}
