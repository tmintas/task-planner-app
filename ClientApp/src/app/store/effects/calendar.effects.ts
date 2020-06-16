import * as fromCalendarActions from '@actions/calendar';
import * as fromRouterActions from '@actions/router';

import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { withLatestFrom, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromAuthSelectors from '@selectors/auth';
import { GoDefaultMonth, LoadMonthDays, InitFromUrlSuccess } from '@actions/calendar';
import { selectedRoutedYear, selectedRoutedDay, selectedRoutedMonth, selectedRoutedItemId, selectedRoutedMode } from '@selectors/router';
import { selectedDate } from '@selectors/calendar';
import { TodoService } from 'app/to-dos/services/todo.service';
import { of } from 'rxjs';

@Injectable()
export class CalendarEffects {
    constructor(
        private actions$ : Actions,
        private store$ : Store<AppState>,
        private todoService : TodoService
    ) {}

    public NavigateAfterDaySelected$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.SelectDayToAdd),
        map((payload) => fromRouterActions.go({ path : [
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
        map(([payload]) => fromRouterActions.go({ path : [
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
            (action, calendarState, isAuthenticated) => {
                return fromRouterActions.go({ path : [
                    'calendar', 
                    calendarState.selectedYear, 
                    calendarState.selectedMonth,
                ] });
            })
    ));  

    public InitFromUrlSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.InitFromUrlSuccess),
        withLatestFrom(
            this.store$.select(selectedDate),
            ((action, date) => {
                console.log(date);
                
                if (date == null) {
                    return GoDefaultMonth();
                } else {
                    return LoadMonthDays({ month : date.getMonth() + 1, year: date.getFullYear() });
                } 
            })
        )
    ));
    
    public InitFromUrl$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.InitFromUrl),
        withLatestFrom(this.store$.select(selectedRoutedItemId)),
        map(([, itemId]) => itemId),
        switchMap((itemId : number) => !itemId ? of(null) : this.todoService.Get(itemId)),
        withLatestFrom(
            this.store$.select(selectedRoutedYear),
            this.store$.select(selectedRoutedMonth),
            this.store$.select(selectedRoutedDay),
            this.store$.select(selectedRoutedMode),
        ),
        map(([item, year, month, day, mode]) => {
            
            if (!year || !month) {
                return GoDefaultMonth();
            }

            return InitFromUrlSuccess({ year, day, item, month, mode });
        }
    )), { dispatch : true });

}