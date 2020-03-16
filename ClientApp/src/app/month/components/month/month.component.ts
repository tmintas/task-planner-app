import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromTodoActions from '@actions/todo';
import * as fromCalendarActions from '@actions/calendar';
import { Observable } from 'rxjs';
import AppState from '@states/app';
import { Day } from '@month-models';
import { mergeMapTo } from 'rxjs/operators';
import { Todo } from '@todo-models';

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

	public ngOnInit() : void {
		this.store.pipe(
			select(fromCalendarSelectors.selectedMonth),
			mergeMapTo(
				this.store.select(fromCalendarSelectors.selectedYear),
				(month, year) => this.store.dispatch(fromCalendarActions.LoadMonthDays({ month, year }))
			)
		).subscribe();

		this.store.dispatch(fromTodoActions.LoadImportanceOptions());
		this.store.dispatch(fromTodoActions.LoadTodosAll());
	}

	public GoPreviousMonth() : void {
		this.store.dispatch(fromCalendarActions.goPreviousMonth());
	}

	public GoNextMonth() : void {
		this.store.dispatch(fromCalendarActions.goNextMonth());
	}

	public TodosByDay(dayIndex : number, month : number) : Observable<Todo[]> {
		return this.store.select(fromTodoSelectors.selectTodosByMonthAndDay, { month: month , day : dayIndex });
	}
}
