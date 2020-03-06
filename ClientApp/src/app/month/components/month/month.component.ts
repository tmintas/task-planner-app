import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { map, withLatestFrom } from 'rxjs/operators';

import * as fromDateFunctions from '@shared-functions/date';
import { Store } from '@ngrx/store';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromTodoActions from '@actions/todo';
import * as fromCalendarActions from '@actions/calendar';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { Observable } from 'rxjs';
import AppState from '@states/app';
import { Day } from '@month-models';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private store : Store<AppState>) {	}

	private month : number;
	private year : number;

	public CurrentDays$ : Observable<Day[]>;
	public PreviousDays$ : Observable<Day[]>;
	public NextDays$ : Observable<Day[]>;
	public IsLoading$ : Observable<boolean>;
	public Month$ : Observable<number> = this.store.select(fromCalendarSelectors.selectedMonth);
	public Year$ : Observable<number> = this.store.select(fromCalendarSelectors.selectedYear);
	public MonthName$ : Observable<string> = this.store.select(fromCalendarSelectors.selectedMonthName);

	public get Month() : number {
		return this.month;
	}

	public get Year() : number {
		return this.year;
	}

	public get MonthName() : string {
		return fromDateFunctions.GetMonthName(this.month);
	}

	public ngOnInit() : void {
		this.store.select(fromCalendarSelectors.selectedMonth).pipe(
			withLatestFrom(this.store.select(fromCalendarSelectors.selectedYear)),
			map(([month, year]) => {
				console.log('month');
				console.log(month);
				console.log(year);
				
				this.store.dispatch(fromCalendarActions.LoadMonthDays({ month, year }));
			})
		).subscribe();

		this.store.dispatch(fromTodoActions.LoadImportanceOptions());
		this.store.dispatch(fromTodoActions.LoadTodosAll());

		this.CurrentDays$ = this.store.select(fromCalendarSelectors.currentMonthDays);
		this.PreviousDays$ = this.store.select(fromCalendarSelectors.previousMonthDays);
		this.NextDays$ = this.store.select(fromCalendarSelectors.nextMonthDays);
		this.IsLoading$ = this.store.select(fromTodoSelectors.itemsLoading);
	}

	public GoPreviousMonth() : void {
		this.store.dispatch(fromCalendarActions.goPreviousMonth());
	}

	public GoNextMonth() : void {
		this.store.dispatch(fromCalendarActions.goNextMonth());
	}

	public TodosByDay(dayIndex : number, month : number) : Observable<ToDoItem[]> {
		return this.store.select(fromTodoSelectors.selectTodosByMonthAndDay,
		{
			month: month,
			day : dayIndex
		});
	}
}
