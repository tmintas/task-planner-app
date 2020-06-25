import { Injectable } from '@angular/core';
import AppState from '@states/app';
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { withLatestFrom, map, mergeMap, catchError, mergeMapTo, switchMap } from 'rxjs/operators';
import * as fromAuthActions from '@actions/auth';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromRouterActions from '@actions/router';
import { AuthService } from 'app/auth/services/auth.service';
import { SignInSuccess, SignInFail, InitUser, InitUserSuccess, InitUserFail } from '@actions/auth';
import { of } from 'rxjs';
import { User } from 'app/auth/models/user.model';
import { backUrl } from '@selectors/auth';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private authService : AuthService) { }

    public GoDenied$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.GoDenied),
        withLatestFrom(
            this.store$.select(fromCalendarSelectors.selectedMonth), 
            this.store$.select(fromCalendarSelectors.selectedYear), (action, month, year) => {
            return fromRouterActions.Go({ path : [
                'calendar', 
                year,
                month,
                'login',
            ]})
         })
    ));

    public GoStart$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.GoStart),
        withLatestFrom(
            this.store$.select(fromCalendarSelectors.selectedMonth), 
            this.store$.select(fromCalendarSelectors.selectedYear), (action, month, year) => {
            return fromRouterActions.Go({ path : [
                'calendar', 
                year,
                month,
                'home',
            ]})
         })
    ));

    public InitUser$ = createEffect(() => this.actions$.pipe(
        ofType(InitUser),
        map(() => {
            const userStr = localStorage.getItem('user');
            let user : User;

            if (userStr) 
            {
                user = JSON.parse(userStr) as User;

                if (user.UserName && user.Token)
                {
                    return InitUserSuccess({ user })
                }

                return InitUserFail();
            }

            return InitUserFail();
        })
    ));

    public SignIn$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignIn),
        switchMap((action) => {
            return this.authService.Login(action.user).pipe(
                map((res : { token : string, error? : string, userName : string }) => {
                    return SignInSuccess({ user : new User(res.userName, res.token) })
                }),
                catchError((err) => {
                    return of(SignInFail(err))
                })
            )
        })
    ));

    public SignInSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignInSuccess),
        withLatestFrom(
            this.store$.select(backUrl), 
            this.store$.select(fromCalendarSelectors.selectedMonth), 
            this.store$.select(fromCalendarSelectors.selectedYear), 
            (action, backUrl, month, year) => {
                localStorage.setItem('user', JSON.stringify(action.user));

                if (backUrl) {
                    let pathItems = [];

                    pathItems = Object.values(backUrl);
                    console.log(pathItems);
                    
                    return fromRouterActions.goByUrl({ url : backUrl })
                }

                return fromRouterActions.Go({ path : [
                    'calendar', 
                    year,
                    month,
                    'home',
                ]})
         })
    ));

    public SignOut$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignOut),
        withLatestFrom(
            this.store$.select(fromCalendarSelectors.selectedMonth), 
            this.store$.select(fromCalendarSelectors.selectedYear), (token, month, year) => {
                
            localStorage.removeItem('user');
            return fromRouterActions.Go({ path : [
                'calendar', 
                year,
                month,
                'login',
            ]})
         })
    ));
}
