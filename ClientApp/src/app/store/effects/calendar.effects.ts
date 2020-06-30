import * as fromCalendarActions from '@actions/calendar';
import * as fromRouterActions from '@actions/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { withLatestFrom, map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import AppState from '@states/app';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromAuthSelectors from '@selectors/auth';
import { InitMonth } from '@actions/calendar';
import { selectCalendarParamsFromUrl } from '@selectors/router';
import { CALENDAR_DEFAULT_MONTH, CALENDAR_DEFAULT_YEAR } from '@states/calendar';
import { Go } from '@actions/router';
import { TodoService } from 'app/to-dos/services/todo.service';
import { of } from 'rxjs';

@Injectable()
export class CalendarEffects {
    constructor(
        private actions$ : Actions,
        private store$ : Store<AppState>,
        private todoService : TodoService) {}

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

    // implements default Router logic for empty paths
    // when some of route segments missing, it navigates to defaults (current date)
    // replaces default Angular Router logic in routing.module.ts since it doesn't work with dynamic params
    // I would love to know if there's a better way to do this :)
    public InitFromUrl$ = createEffect(() => this.actions$.pipe(
        ofType(fromCalendarActions.InitFromUrl),
        withLatestFrom(
            this.store$.select(selectCalendarParamsFromUrl),
            (action, params) => params
        ),
        // if item is specified in URL, retrieve it from service and add to params
        switchMap((params) => {
            if (params.itemId > 0) {
                return this.todoService.Get(params.itemId).pipe(
                    map((todo) => {
                        let paramsWithTodo = Object.create(params);

                        if (todo) {
                            paramsWithTodo.todo = todo;
                        }

                        return paramsWithTodo;
                    }),
                    catchError(() => {
                        return of(params)
                    })
                )
            } else {
                return of(params);
            }
        }),
        switchMap((params) => {
            if (!params.year && !params.month) {
                return [ 
                    InitMonth({ year : CALENDAR_DEFAULT_YEAR, month : CALENDAR_DEFAULT_MONTH }), 
                    Go({ path : [ 'calendar', CALENDAR_DEFAULT_YEAR, CALENDAR_DEFAULT_MONTH ] }) 
                ];
            } 
            else if (params.year && !params.month ) {
                return [ 
                    InitMonth({ year : params.year, month : CALENDAR_DEFAULT_MONTH }), 
                    Go({ path : [ 'calendar', params.year, CALENDAR_DEFAULT_MONTH ] }) 
                ];
            } 
            else if (params.year && params.month ) {
                let path = [ 'calendar', params.year, params.month ];

                if (params.day) {
                    path.push(params.day);
                }
                if (params.itemId != null) {
                    path.push('edit', params.itemId);
                }

                return [ 
                    InitMonth({ year : params.year, month : params.month, day : params.day, mode : params.mode, todo : params.todo }), 
                    Go({ path }) 
                ];
            }
        })
    ), { dispatch : true });
}