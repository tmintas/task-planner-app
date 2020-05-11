import { Component, OnInit } from '@angular/core';
import * as fromCalendarActions from '@actions/calendar';
import { Store } from '@ngrx/store';
import AppState from '@states/app';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styles: []
})
export class CalendarComponent implements OnInit {

  constructor(private store$ : Store<AppState>) { }

  ngOnInit() {
    this.store$.dispatch(fromCalendarActions.InitFromUrl());
  }

}
