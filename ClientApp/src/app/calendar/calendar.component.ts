import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import AppState from '@states/app';
import { Observable } from 'rxjs';
import { daysLoaded } from '@selectors/calendar';
import { InitFromUrl } from '@actions/calendar';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styles: []
})
export class CalendarComponent implements OnInit {

    public DaysLoaded$ : Observable<boolean>;

    constructor(private store$: Store<AppState>) { 
        this.DaysLoaded$ = this.store$.pipe(select(daysLoaded));
    }

    ngOnInit() : void {
        this.store$.dispatch(InitFromUrl());
    }
}
