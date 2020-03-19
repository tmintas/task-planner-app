import * as fromCalendarActions from '@actions/calendar';
import * as fromTodoActions from '@actions/todo';
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
        ofType(fromTodoActions.SelectItemForEdit),
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        tap(([payload, calendarState]) => { 
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                calendarState.selectedYear, 
                calendarState.selectedMonth, 
                calendarState.selectedDayToView,
                'edit',
                payload.itemId
            ]}))                
        })
    ), { dispatch : false });

    public NavigateAfterDayForViewChanged$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.selectDayToView),
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
        ofType(fromCalendarActions.goNextMonth, fromCalendarActions.goPreviousMonth),
        withLatestFrom(this.store$.select(fromCalendarSelectors.featureSelector)),
        tap(([payload, calendarState]) => {
            this.store$.dispatch(fromRouterActions.go({ path : [
                'calendar', 
                calendarState.selectedYear, 
                calendarState.selectedMonth
            ] }))
        })
    ), { dispatch : false });
}