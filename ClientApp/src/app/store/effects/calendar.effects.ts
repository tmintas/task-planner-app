import * as fromCalendarActions from '@actions/calendar';
import * as fromRouterActions from '@actions/router';
import * as fromRouterSelectors from '@selectors/router';

import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, withLatestFrom, map, switchMapTo } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import * as fromCalendarSelectors from '@selectors/calendar';

@Injectable()
export class CalendarEffects {
    constructor(
        private actions$ : Actions,
        private store$ : Store<AppState>) {}

    public NavigateAfterDaySelected$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.SelectDayToAdd),
        tap((payload) => {
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                payload.date.getFullYear(),
                payload.date.getMonth() + 1,
                payload.date.getDate(),
                'edit',
                0
            ] }))
        })
    ));

    public NavigateAfterItemSelectedForEdit$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.SelectItemForEdit),
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        map(([payload, calendarState]) => { 
            return fromRouterActions.go({ path : [
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
        map(([payload, calendarState]) => fromRouterActions.go({ path : [
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
        switchMapTo(this.store$.select(fromCalendarSelectors.featureSelector)),
        map(calendarState => {
            return fromRouterActions.go({ path : [
                'calendar', 
                calendarState.selectedYear, 
                calendarState.selectedMonth
            ] })
        })
    ));

    public InitFromUrl$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.InitFromUrl),
        withLatestFrom(this.store$.select(fromRouterSelectors.selectedMonthAndYear)),
        map(([payload, date]) => {
            if (date == null || !date.month) {
                return fromCalendarActions.GoDefaultMonth();
            } else {
                return fromCalendarActions.LoadMonthDays({ month : date.month, year: date.year });
            }    
        })
    ));

    public InitMonthToView$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.InitMonthToView),
        withLatestFrom(this.store$.select(fromRouterSelectors.selectedMonthAndYear)),
        map(([date]) => {
            console.log(date);
            
            return fromCalendarActions.LoadMonthDays({ month : date.month, year: date.year });
        })
    ), { dispatch : true });
    
}