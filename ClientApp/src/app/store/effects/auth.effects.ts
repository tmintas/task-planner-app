import { Injectable } from '@angular/core';
import { withLatestFrom, map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import { LoginResponse, User } from '@auth-models';

import AppState from '@states/app';
import * as fromAuthActions from '@actions/auth';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromRouterActions from '@actions/router';
import * as fromTodoAtions from '@actions/todo';
import { AuthService } from 'app/auth/services/auth.service';
import { SignInFail, InitUser, InitUserSuccess, InitUserFail } from '@actions/auth';
import { backUrl, currentUser, refreshTokenTimerId } from '@selectors/auth';
import { LoadTodosAll } from '@actions/todo';
import { Go, goByUrl } from '@actions/router';

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

            if (userStr) 
            {
                const user = JSON.parse(userStr) as User;

                if (user.UserName && user.AccessToken)
                {
                    return InitUserSuccess({ user })
                }

                return InitUserFail();
            }

            return InitUserFail();
        })
    ));

    public LoadItemsAfterSuccessfulUserInit$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.InitUserSuccess),
        map(() => LoadTodosAll())
    ));

    public SignIn$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignIn),
        switchMap((action) => {
            return this.authService.Login(action.user).pipe(
                switchMap((res : LoginResponse) => {
                    return [ 
                        fromAuthActions.SignInSuccess({ user : new User(res.Username, res.AccessToken) })
                    ]
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
            this.store$.select(currentUser), 
            this.store$.select(backUrl), 
            this.store$.select(fromCalendarSelectors.selectedMonth), 
            this.store$.select(fromCalendarSelectors.selectedYear),
            (action, user, backUrl, month, year) => {
                return { user, backUrl, month, year };
            }
        ),
        switchMap((state) => {
            localStorage.setItem('user', JSON.stringify(state.user));

            if (state.backUrl) {
                let pathItems = [];

                pathItems = Object.values(state.backUrl);
                console.log(pathItems);
                
                return [ goByUrl({ url : state.backUrl }), LoadTodosAll() ];
            }

                return [ 
                    Go({ path : [ 'calendar', state.year, state.month, 'home', ]}), 
                    LoadTodosAll(), 
                    fromAuthActions.InitRefreshTimer() 
                ];
        })
    ), { dispatch : true });

    public SignOut$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignOut),
        withLatestFrom(
            this.store$.select(fromCalendarSelectors.selectedMonth), 
            this.store$.select(fromCalendarSelectors.selectedYear), (token, month, year) => {
                return { month, year };
            }),
        switchMap((params) => {
            localStorage.removeItem('user');

            return [ 
                fromRouterActions.Go({ path : [ 'calendar', params.year, params.month, 'login' ]}), 
                fromTodoAtions.ClearTodos(), 
                fromAuthActions.ClearRefreshTokenTimer() 
            ];
        })
    ));

    public InitRefreshTimer$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.InitRefreshTimer),
        map(() => {
            // TODO to app settings
            const accessTokenLifeTimeMins = 1; 

            // call refresh 10 sec before access token expires
            const checkTime = accessTokenLifeTimeMins * 60 * 1000 - 10 * 1000;
            const timerId = setTimeout(() => { this.store$.dispatch(fromAuthActions.RefreshToken()); }, checkTime);

            return fromAuthActions.InitRefreshTimerSuccess({ refreshTokenTimerId : timerId });
        })
    ), { dispatch : true });

    public RefreshToken$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.RefreshToken),
        mergeMap(() => {
            return this.authService.RefreshToken().pipe(
                map((response : { accessToken: string }) => {
                    return fromAuthActions.RefreshTokenSuccess({ newAccessToken : response.accessToken });
                })
            );
        })
    ), { dispatch : true });

    public RefreshTokenSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.RefreshTokenSuccess),
        map((payload : { newAccessToken : string }) => {
            localStorage.setItem('user', JSON.stringify(new User('test', payload.newAccessToken)));

            return fromAuthActions.InitRefreshTimer();
        })
    ), { dispatch : true });

    public ClearRefreshTokenTimer$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.ClearRefreshTokenTimer),
        withLatestFrom(this.store$.select(refreshTokenTimerId)),
        map(([action, timerId]) => {
            clearInterval(timerId)

            return fromAuthActions.ClearRefreshTokenTimerSuccess();

        })
    ), { dispatch : true });
}
