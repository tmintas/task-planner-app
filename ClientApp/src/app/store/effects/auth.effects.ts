import { Injectable } from '@angular/core';
import AppState from '@states/app';
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { withLatestFrom, map, mergeMap, catchError } from 'rxjs/operators';
import * as fromAuthActions from '@actions/auth';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromRouterActions from '@actions/router';
import { AuthService } from 'app/auth/services/auth.service';
import { SignInSuccess, SignInFail } from '@actions/auth';
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
            return fromRouterActions.go({ path : [
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
            return fromRouterActions.go({ path : [
                'calendar', 
                year,
                month,
                'home',
            ]})
         })
    ));

    
	// public UpdateTodo$ = createEffect(() => this.actions$.pipe(
	// 	ofType(fromTodoActions.UpdateTodo),
	// 	mergeMap((action) => {
			
	// 		return this.todoService.Update(+action.item.id, action.item.changes).pipe(
	// 			map(() => {
	// 				const todoUpdate : Update<Todo> = {
	// 					id : +action.item.id,
	// 					changes : action.item.changes
	// 				};
					
	// 				return fromTodoActions.UpdateTodoSuccess({ item : todoUpdate });
	// 			}),
	// 			catchError(err => of(fromTodoActions.UpdateTodoFail({ err })))
	// 		);
	// 	})
	// ));


    public SignIn$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.SignIn),
        mergeMap((action) => {
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
        map(action => action.user),
        withLatestFrom(
            this.store$.select(backUrl), 
            this.store$.select(fromCalendarSelectors.selectedMonth), 
            this.store$.select(fromCalendarSelectors.selectedYear), 
            (user, backUrl, month, year) => {
                localStorage.setItem('user', JSON.stringify(user));

                if (backUrl) {
                    let pathItems = [];

                    pathItems = Object.values(backUrl);
                    console.log(pathItems);
                    
                    return fromRouterActions.goByUrl({ url : backUrl })
                }

                return fromRouterActions.go({ path : [
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
            return fromRouterActions.go({ path : [
                'calendar', 
                year,
                month,
                'login',
            ]})
         })
    ));
}
