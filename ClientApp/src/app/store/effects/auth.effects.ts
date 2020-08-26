import { Injectable } from '@angular/core';
import AppState from '@states/app';
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { withLatestFrom, map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';
import * as fromAuthActions from '@actions/auth';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromRouterActions from '@actions/router';
import * as fromTodoAtions from '@actions/todo';
import { AuthService } from 'app/auth/services/auth.service';
import { SignInSuccess, SignInFail, InitUser, InitUserSuccess, InitUserFail } from '@actions/auth';
import { of, timer, interval } from 'rxjs';
import { User } from 'app/auth/models/user.model';
import { backUrl, currentUser } from '@selectors/auth';
import { LoadTodosAll } from '@actions/todo';
import { Go, goByUrl } from '@actions/router';
import { LoginResponse } from '@auth-models';
import { LoginModel } from 'app/auth/models/login.model';

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
        mergeMap((action) => {
            return this.authService.Login(action.user).pipe(
                switchMap((res : LoginResponse) => {
                    return [ 
                        fromAuthActions.SignInSuccess({ user : new User(res.Username, res.AccessToken) }), 
                        fromAuthActions.InitRefreshTimer()
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

            return [ Go({ path : [ 'calendar', state.year, state.month, 'home', ]}), LoadTodosAll() ]
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
            return [ fromRouterActions.Go({ path : [ 'calendar', params.year, params.month, 'login' ]}), fromTodoAtions.ClearTodos() ];
        })
    ));

    public InitRefreshTimer$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.InitRefreshTimer),
        map(() => {
            // call refresh 10 sec before access token expires
            const accessTokenLifeTimeMins = 0.5; // 30 sec

            const checkTime = new Date(new Date().getTime() + accessTokenLifeTimeMins * 60 * 1000 - 10 * 1000);

            timer(checkTime).pipe(
                tap(() => {
                    this.store$.dispatch(fromAuthActions.RefreshToken());
                })
            ).subscribe();            
        })
    ), { dispatch : false });

    public RefreshToken$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.RefreshToken),
        switchMap(() => {
            console.log('refresh token action called');
            
            return this.authService.RefreshToken().pipe(
                map((newAccessToken) => {
                    console.log('refresh token service method called');

                    return fromAuthActions.RefreshTokenSuccess({ newAccessToken });
                })
            );
        })
    ));

    public RefreshTokenSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.RefreshTokenSuccess),
        tap((payload) => {
            console.log('refresh success. saving token in localstorage');
            console.log(document.cookie);
            localStorage.setItem('user', JSON.stringify(new User('test', payload.newAccessToken)))
        })
    ), { dispatch : false });
}
