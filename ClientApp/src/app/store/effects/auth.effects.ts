import { Injectable } from '@angular/core';
import { withLatestFrom, map, catchError, switchMap, mergeMap, tap, switchMapTo } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import { LoginResponse, User } from '@auth-models';

import AppState from '@states/app';
import * as fromAuthActions from '@actions/auth';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromTodoAtions from '@actions/todo';
import { AuthService } from 'app/auth/services/auth.service';
import { SignInFail, InitUser, InitUserSuccess, InitUserFail } from '@actions/auth';
import { currentUser, refreshTokenTimerId } from '@selectors/auth';
import * as fromRouterSelectors from '@selectors/router';
import * as fromTodoActions from '@actions/todo';
import * as fromRouterActions from '@actions/router';
import { CalendarRoutedParams } from '@shared-models';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private authService : AuthService) { }

    public GoDenied$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.GoDenied),
        withLatestFrom(
            this.store$.select(fromRouterSelectors.selectCalendarParamsFromUrl),
            (action, params: CalendarRoutedParams) => {
              return fromRouterActions.Go({ path : [ 'calendar', params.year, params.month, 'login' ], queryParams : { backUrl : action.backUrl }})
         })
    ));

    public GoStart$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.GoStart),
        withLatestFrom(
            this.store$.select(fromCalendarSelectors.selectedMonth),
            this.store$.select(fromCalendarSelectors.selectedYear),
            (_, month, year) => {
            return fromRouterActions.Go({ path : [ 'calendar', year, month, 'home' ]})
        })
    ));

    public InitUser$ = createEffect(() => this.actions$.pipe(
        ofType(InitUser),
        map(() => {
            const userStr = localStorage.getItem('user');

            if (!userStr) {
                return InitUserFail();
            }

            const user = JSON.parse(userStr) as User;

            if (!user || !user.AccessToken) {
                return InitUserFail();
            }

            const decodedJwt = JSON.parse((atob(user.AccessToken.split('.')[1])));
            const expired = new Date() > new Date(decodedJwt.exp * 1000);

            if (expired) {
                return InitUserFail();
            }

            return InitUserSuccess({ user })
        })
    ));

    public InitUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.InitUserSuccess),
        switchMap(() => {
            return [
                fromTodoActions.LoadTodosAll(),
                fromTodoActions.LoadImportanceOptions(),
                fromAuthActions.InitRefreshTimer()
            ];
        })
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
            this.store$.select(fromRouterSelectors.backUrl),
            this.store$.select(fromCalendarSelectors.selectedMonth),
            this.store$.select(fromCalendarSelectors.selectedYear),
            (action, user, backUrl, month, year) => {
                return { user, backUrl, month, year };
            }
        ),
        switchMap((state) => {
            localStorage.setItem('user', JSON.stringify(state.user));

            if (state.backUrl) {
                return [
                    fromRouterActions.GoByUrl({ url : state.backUrl }),
                    fromTodoActions.LoadImportanceOptions(),
                    fromTodoActions.LoadTodosAll() ];
            }

            return [
                fromRouterActions.Go({ path : [ 'calendar', state.year, state.month, 'home', ]}),
                fromTodoActions.LoadImportanceOptions(),
                fromTodoActions.LoadTodosAll(),
                fromAuthActions.InitRefreshTimer()
            ];
        })
    ));

    public SignOut$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignOut),
        withLatestFrom(
            this.store$.select(fromCalendarSelectors.selectedMonth),
            this.store$.select(fromCalendarSelectors.selectedYear), (token, month, year) => {
                return { month, year };
            }),
        switchMap(() => {
            localStorage.removeItem('user');

            return [
                fromRouterActions.GoLanding(),
                fromTodoAtions.ClearTodos(),
                fromAuthActions.ClearRefreshTokenTimer()
            ];
        })
    ));

    public SignUp$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignUp),
        switchMap((payload) => {
            return this.authService.Register(payload.model).pipe(
                map(() => {
                    return fromAuthActions.SignUpSuccess()
                }),
                catchError(() => {
                    return of(fromAuthActions.SignUpFail());
                })
            )
        })
    ));

    public SignUpSuc$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignUpSuccess),
        map(() => fromRouterActions.GoLanding())
    ));

    public SignUpF$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignUpFail),
        tap(() => console.log('sign up fail'))
    ), { dispatch : false });

    public InitRefreshTimer$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.InitRefreshTimer),
        map(() => {
            const user : User = JSON.parse(localStorage.getItem('user'));
            const tokenExpirationTimeMs = JSON.parse(atob(user.AccessToken.split('.')[1])).exp * 1000;

            // call refresh 10 sec before access token expires
            const timeBeforeRefreshMs = tokenExpirationTimeMs - new Date().getTime() - 10 * 1000;
            console.log('refresh in ' + timeBeforeRefreshMs);

            const timerId = setTimeout(() => { this.store$.dispatch(fromAuthActions.RefreshToken()); }, timeBeforeRefreshMs);

            return fromAuthActions.InitRefreshTimerSuccess({ refreshTokenTimerId : timerId });
        })
    ));

    public RefreshToken$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.RefreshToken),
        mergeMap(() => {
            return this.authService.RefreshToken().pipe(
                map((response : { accessToken: string }) => {
                    return fromAuthActions.RefreshTokenSuccess({ newAccessToken : response.accessToken });
                })
            );
        })
    ));

    public RefreshTokenSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.RefreshTokenSuccess),
        map((payload : { newAccessToken : string }) => {
            localStorage.setItem('user', JSON.stringify(new User('test', payload.newAccessToken)));

            return fromAuthActions.InitRefreshTimer();
        })
    ));

    public ClearRefreshTokenTimer$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.ClearRefreshTokenTimer),
        withLatestFrom(this.store$.select(refreshTokenTimerId)),
        map(([action, timerId]) => {
            clearInterval(timerId)

            return fromAuthActions.ClearRefreshTokenTimerSuccess();

        })
    ));
}
