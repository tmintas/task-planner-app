import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, withLatestFrom, map, switchMap, catchError, take } from 'rxjs/operators';
import { Go, goByUrl } from '@actions/router';
import { Store } from '@ngrx/store';
import { selectCalendarParamsFromUrl } from '@selectors/router';
import AppState from '@states/app';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { CalendarModes, CALENDAR_DEFAULT_YEAR, CALENDAR_DEFAULT_MONTH } from '@states/calendar';
import { of } from 'rxjs';
import { TodoService } from 'app/to-dos/services/todo.service';
import { InitMonth } from '@actions/calendar';
import { CalendarRoutedParams } from '@shared-models';

@Injectable()
export class RouterEffects {
    constructor(
        private router: Router,
        private actions$ : Actions,
        private store$: Store<AppState>,
        private todoService : TodoService) {}

    public Go$ = createEffect(() => this.actions$.pipe(
        ofType(Go),
        tap((payload) => {
            this.router.navigate(payload.path, payload.extras);
        })
    ), { dispatch : false });
    
    public GoByUrl$ = createEffect(() => this.actions$.pipe(
		ofType(goByUrl),
        tap((payload) => this.router.navigateByUrl(payload.url))
    ), { dispatch : false });

    // init state after page reload, called only once
    public InitFromUrl$ = createEffect(() => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        take(1),
        withLatestFrom(
            this.store$.select(selectCalendarParamsFromUrl),
            (action, params : CalendarRoutedParams) => { 
                const nonNegativeParams = Object.keys(params).reduce(function(result, key) {
                    result[key] = params[key] === null ? null : Math.max(params[key], 0);
                    return result;
                }, {})

                return nonNegativeParams;
            }),
        // if item is specified in URL, retrieve it from service and add to params
        switchMap((params : CalendarRoutedParams) => {
            if (params.itemId > 0) {
                return this.todoService.Get(params.itemId).pipe(
                    map((item) => {
                        let paramsWithTodo = Object.create(params);

                        if (item) {
                            paramsWithTodo.item = item;
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
        // conditional routing to default values, if not specified in url
        map((params) => {
            console.log(params.item);
            
            // TODO add tests
            const mode = params.itemId > 0 
                ? CalendarModes.EditTodo
                : params.itemId === 0 
                    ? CalendarModes.AddTodo
                    : params.day > 0
                        ? CalendarModes.ViewingDayItems
                        : CalendarModes.Start;

            if (!params.year && !params.month) {
                this.router.navigateByUrl(`calendar/${CALENDAR_DEFAULT_YEAR}/${CALENDAR_DEFAULT_MONTH}`);
                return InitMonth({ year : CALENDAR_DEFAULT_YEAR, month: CALENDAR_DEFAULT_MONTH })
            }

            if (params.year && !params.month) {
                this.router.navigateByUrl(`calendar/${params.year}/${CALENDAR_DEFAULT_MONTH}`);
                return InitMonth({ year : params.year, month: CALENDAR_DEFAULT_MONTH });
            }

            if (!params.year && params.month) {
                this.router.navigateByUrl(`calendar/${CALENDAR_DEFAULT_YEAR}/${params.month}`);
                return InitMonth({ year : CALENDAR_DEFAULT_YEAR, month: params.month });
            }

            return InitMonth({ year : params.year, month: params.month, day: params.day, mode, item : params.item });
        })
    ), { dispatch : true });
}