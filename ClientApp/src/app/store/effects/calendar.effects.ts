import * as fromCalendarActions from '@actions/calendar';
import * as fromRouterActions from '@actions/router';
import * as fromRouterSelectors from '@selectors/router';

import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, withLatestFrom, map } from 'rxjs/operators';
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
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        tap(([payload, calendarState]) => {
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                calendarState.selectedYear, 
                calendarState.selectedMonth, 
                payload.day,
                'edit',
                0
            ] }))
        })
    ), { dispatch : false });

    public NavigateAfterItemSelectedForEdit$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.SelectItemForEdit),
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        tap(([payload, calendarState]) => { 
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                payload.item.Date.getFullYear(), 
                payload.item.Date.getMonth() + 1, 
                payload.item.Date.getDate(),
                'edit',
                payload.item.id
            ]}))                
        })
    ), { dispatch : false });

    public NavigateAfterDayForViewChanged$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.SelectDayToView),
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        tap(([payload, calendarState]) => {
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                calendarState.selectedYear, 
                calendarState.selectedMonth,
                payload.day
            ] }));            
        })
    ), { dispatch : false });

    public NavigateAfterMonthChanged$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.GoNextMonth, fromCalendarActions.GoPreviousMonth),
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        tap(([, calendarState]) => {
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                calendarState.selectedYear, 
                calendarState.selectedMonth
            ] }))
        })
    ), { dispatch : false });

    public InitFromUrl$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.InitFromUrl),
        withLatestFrom(this.store$.select(fromRouterSelectors.selectedMonthAndYear)),
        map(([payload, date]) => {
            if (date == null) {
                const now = new Date();
                return fromCalendarActions.InitMonthToView({ month : now.getMonth() , year: now.getFullYear() });
            }
            
            return fromCalendarActions.InitMonthToView({ month : date.month, year: date.year });
        })
    ), { dispatch : true });

    public InitMonthToView$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.InitMonthToView),
        withLatestFrom(this.store$.select(fromRouterSelectors.selectedMonthAndYear)),
        map(([, date]) => {
            console.log('init effect');
            
            console.log(date.month);
            
            return fromCalendarActions.LoadMonthDays({ month : date.month, year: date.year });
        })
    ), { dispatch : true });
}