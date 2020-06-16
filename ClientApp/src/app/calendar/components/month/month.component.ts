import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import AppState from '@states/app';
import { Todo } from '@todo-models';
import { SignOut } from '@actions/auth';
import { itemsLoading, selectTodosByDate } from '@selectors/todo';
import { LoadImportanceOptions, LoadTodosAll } from '@actions/todo';
import { selectedMonth, selectedYear, selectedMonthName, selectedMonthDaysWithNeighbors } from '@selectors/calendar';
import { isAuthenticated, currentUser, authError } from '@selectors/auth';
import { GoPreviousMonth, GoNextMonth, GoDefaultMonth } from '@actions/calendar';
import { User } from 'app/auth/models/user.model';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private store : Store<AppState>) {	}

	public IsLoading$ : Observable<boolean> = this.store.select(itemsLoading);
	public Month$ : Observable<number> = this.store.select(selectedMonth);
	public Year$ : Observable<number> = this.store.select(selectedYear);
	public MonthName$ : Observable<string> = this.store.select(selectedMonthName);
	public Dates$ : Observable<Date[]> = this.store.select(selectedMonthDaysWithNeighbors);
	public IsAuthenticated$ : Observable<boolean> = this.store.select(isAuthenticated);
	public User$ : Observable<User> = this.store.select(currentUser);
	public AuthError$ : Observable<string> = this.store.select(authError);

	public ngOnInit() : void {
		this.store.dispatch(LoadImportanceOptions());
		this.store.dispatch(LoadTodosAll());
	}

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
