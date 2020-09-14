import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import AppState from '@states/app';
import { Todo } from '@todo-models';
import { SignOut } from '@actions/auth';
import { selectTodosByDate } from '@selectors/todo';
import { selectedMonth, selectedYear, selectedMonthName, selectedMonthDaysWithNeighbors } from '@selectors/calendar';
import { isAuthenticated, currentUserName } from '@selectors/auth';
import { GoPreviousMonth, GoNextMonth } from '@actions/calendar';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent {

	constructor(private store : Store<AppState>) {	}

	public Month$ : Observable<number> = this.store.select(selectedMonth);
	public Year$ : Observable<number> = this.store.select(selectedYear);
	public MonthName$ : Observable<string> = this.store.select(selectedMonthName);
	public Dates$ : Observable<Date[]> = this.store.select(selectedMonthDaysWithNeighbors);
	public IsAuthenticated$ : Observable<boolean> = this.store.select(isAuthenticated);
	public Username$ : Observable<string> = this.store.select(currentUserName);

	public GoPreviousMonth() : void {
		this.store.dispatch(GoPreviousMonth());
	}

	public GoNextMonth() : void {
		this.store.dispatch(GoNextMonth());
	}

	public TodosByDate$(date : Date) : Observable<Todo[]> {
		return this.store.select(selectTodosByDate, { date });
	}

	public OnSignoutClick() : void {
		this.store.dispatch(SignOut())
	}
}
