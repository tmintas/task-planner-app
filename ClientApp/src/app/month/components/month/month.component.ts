import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromTodoActions from '@actions/todo';
import * as fromCalendarActions from '@actions/calendar';

import { Observable } from 'rxjs';
import AppState from '@states/app';
import { Day } from '@month-models';
import { Todo } from '@todo-models';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private store : Store<AppState>) {	}

	public CurrentDays$ : Observable<Day[]> = this.store.select(fromCalendarSelectors.currentMonthDays);
	public PreviousDays$ : Observable<Day[]> = this.store.select(fromCalendarSelectors.previousMonthDays);
	public NextDays$ : Observable<Day[]> = this.store.select(fromCalendarSelectors.nextMonthDays);
	public IsLoading$ : Observable<boolean> = this.store.select(fromTodoSelectors.itemsLoading);
	public Month$ : Observable<number> = this.store.select(fromCalendarSelectors.selectedMonth);
	public Year$ : Observable<number> = this.store.select(fromCalendarSelectors.selectedYear);
	public MonthName$ : Observable<string> = this.store.select(fromCalendarSelectors.selectedMonthName);

	public CurrentDates$ : Observable<Date[]> = this.store.select(fromCalendarSelectors.selectedCurrentDates).pipe(tap(console.log));
	public PreviousDates$ : Observable<Date[]> = this.store.select(fromCalendarSelectors.selectedPreviousDates);
	public NextDates$ : Observable<Date[]> = this.store.select(fromCalendarSelectors.selectedNextDates);

	public Dates$ : Observable<Date[]> = this.store.select(fromCalendarSelectors.selectedMonthDaysWithNeighbors);

	public ngOnInit() : void {
		this.store.dispatch(fromCalendarActions.InitFromUrl());
		this.store.dispatch(fromTodoActions.LoadImportanceOptions());
		this.store.dispatch(fromTodoActions.LoadTodosAll());
	}

	public GoPreviousMonth() : void {
		this.store.dispatch(fromCalendarActions.GoPreviousMonth());
	}

	public GoNextMonth() : void {
		this.store.dispatch(fromCalendarActions.GoNextMonth());
	}

	public TodosByDate$(date : Date) : Observable<Todo[]> {
		return this.store.select(fromTodoSelectors.selectTodosByDate, { date });
	}
}
