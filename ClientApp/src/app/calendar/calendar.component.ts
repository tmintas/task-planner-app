import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import AppState from '@states/app';
import { daysLoaded } from '@selectors/calendar';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styles: []
})
export class CalendarComponent {

    public DaysLoaded$ : Observable<boolean>;

    constructor(private store$: Store<AppState>) { 
        this.DaysLoaded$ = this.store$.pipe(select(daysLoaded));
    }
}
