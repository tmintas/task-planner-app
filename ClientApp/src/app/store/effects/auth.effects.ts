import { Injectable } from '@angular/core';
import AppState from '@states/app';
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { withLatestFrom } from 'rxjs/operators';
import * as fromAuthActions from '@actions/auth';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromRouterActions from '@actions/router';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>) { }

    public InitFromUrl$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthActions.GoDenied),
        withLatestFrom(
            this.store$.select(fromCalendarSelectors.selectedMonth), 
            this.store$.select(fromCalendarSelectors.selectedYear), (month, year) => {
            return fromRouterActions.go({ path : [
                'calendar', 
                year,
                month,
                'login',
            ]})
         })
    ));

}
