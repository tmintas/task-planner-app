import * as fromCalendarActions from '@actions/calendar';
import * as fromRouterActions from '@actions/router';

import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { withLatestFrom, map, switchMapTo, skip } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import AppState from '@states/app';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromAuthSelectors from '@selectors/auth';
import { LoadMonthDays } from '@actions/calendar';
import { selectedRoutedYear, selectedRoutedDay, selectedRoutedMonth, selectedRoutedItemId, selectedRoutedMode } from '@selectors/router';
import { selectedDate } from '@selectors/calendar';
import { of, merge } from 'rxjs';

@Injectable()
export class CalendarEffects {
    constructor(
        private actions$ : Actions,
        private store$ : Store<AppState>    ) {}

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
            (action, calendarState) => {
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
                console.log(action);
                
                if (date == null) {
                    return LoadMonthDays({ month : 5, year: 1999 });
                } else {
                    return LoadMonthDays({ month : date.getMonth() + 1, year: date.getFullYear() });
                } 
            })
        )
    ));
    
    public InitFromUrl$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.InitFromUrl),
        switchMapTo(merge(
            // ignore first value of router selectors which is always null
            // TODO find a better soultion
            this.store$.select(selectedRoutedYear).pipe(skip(1)), 
            this.store$.select(selectedRoutedMonth).pipe(skip(1)),
            this.store$.select(selectedRoutedDay).pipe(skip(1)),
            this.store$.select(selectedRoutedItemId).pipe(skip(1)),
            this.store$.select(selectedRoutedMode).pipe(skip(1))
        )),
        map((v) => {
            console.log(v);
            return of(0);
        })
        // withLatestFrom(
        //     this.store$.select(selectedRoutedItemId),
        //     this.store$.select(selectedRoutedYear),
        //     this.store$.select(selectedRoutedMonth),
        //     this.store$.select(selectedRoutedDay),
        //     this.store$.select(selectedRoutedMode),
        //     (result) => { 
        //         console.log(result);
        //         return result;
        //     }
        // ),
        // switchMap((v) => {
        //     console.log(v);
        //     return of(0);
        // })
        // map((result) => {

        //     // if (!year || !month) {
        //     //     return GoDefaultMonth();
        //     // }
        //     console.log('params obtained:');
        //     console.log(result);
            
        //     // console.log(itemId, year, month, day, mode);
        //     return of(3);
            
        //     // return InitFromUrlSuccess({ year, day, itemId, month, mode });
        // })
    ), { dispatch : false });

}