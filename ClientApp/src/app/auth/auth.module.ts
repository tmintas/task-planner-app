import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import * as fromAuthState from '@states/auth';
import * as fromAuthReducers from '@reducers/auth';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/effects/auth.effects';

@NgModule({
    declarations: [
        LoginFormComponent,
        RegisterFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        StoreModule.forFeature(fromAuthState.AUTH_FEATURE_KEY, fromAuthReducers.reducer),
        EffectsModule.forFeature([AuthEffects])
    ],
    exports: [
        LoginFormComponent,
    ],
    providers:[
        AuthService
    ]
})
export class AuthModule { }
