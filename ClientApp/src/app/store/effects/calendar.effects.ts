import * as fromCalendarActions from '@actions/calendar';
import * as fromRouterActions from '@actions/router';

import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import * as fromCalendarSelectors from '@selectors/calendar';

@Injectable()
export class CalendarEffects {
    constructor(
        private actions$ : Actions,
        private store$ : Store<AppState>) {}

    public NavigateAfterDaySelected$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.selectDayToAdd),
        withLatestFrom(this.store$.select(fromCalendarSelectors.feauteSelector)),
        tap(([payload, calendarState]) => {
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                calendarState.selectedYear, 
                calendarState.selectedMonth, 
                calendarState.selectedDay,
                'edit',
                0
            ] }))
        })
    ), { dispatch : false });

    public NavigateAfterItemSelectedForEdit$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.selectItemForEdit),
        withLatestFrom(this.store$.select(fromCalendarSelectors.feauteSelector)),
        tap(([payload, calendarState]) => { 
            console.log('eff');
            
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                calendarState.selectedYear, 
                calendarState.selectedMonth, 
                calendarState.selectedDay,
                'edit',
                payload.itemId
            ]}))
        })
    ), { dispatch : false });
}