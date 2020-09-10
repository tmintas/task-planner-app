import * as fromCalendarActions from '@actions/calendar';
import * as fromRouterActions from '@actions/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { withLatestFrom, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import AppState from '@states/app';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromAuthSelectors from '@selectors/auth';

@Injectable()
export class CalendarEffects {
    constructor(
        private actions$ : Actions,
        private store$ : Store<AppState>) {}

    public NavigateAfterDaySelected$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.SelectDayToAdd),
        map((payload) => fromRouterActions.Go({ path : [
                'calendar', 
                payload.date.getFullYear(),
                payload.date.getMonth() + 1,
                payload.date.getDate(),
                'edit',
                0
            ] })
        )
    ));

    public NavigateAfterItemSelectedForEdit$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.SelectItemForEdit),
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        map(([payload]) => { 
            return fromRouterActions.Go({ path : [
                'calendar', 
                payload.item.Date.getFullYear(), 
                payload.item.Date.getMonth() + 1, 
                payload.item.Date.getDate(),
                'edit',
                payload.item.id
            ]})               
        })
    ));

    public NavigateAfterDayForViewChanged$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.SelectDayToView),
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        map(([payload]) => fromRouterActions.Go({ path : [
                'calendar', 
                payload.date.getFullYear(), 
                payload.date.getMonth() + 1, 
                payload.date.getDate() ,
            ]}            
        )
    )));

    public NavigateAfterMonthChanged$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromCalendarActions.GoNextMonth, 
            fromCalendarActions.GoPreviousMonth,
            fromCalendarActions.GoDefaultMonth),
        withLatestFrom(
            this.store$.select(fromCalendarSelectors.featureSelector), 
            this.store$.select(fromAuthSelectors.isAuthenticated),
            (action, calendarState) => {
                return fromRouterActions.Go({ path : [
                    'calendar', 
                    calendarState.selectedYear, 
                    calendarState.selectedMonth,
                ] });
            })
    ));  
}