import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

import * as fromDateFunctions from '@shared-functions/date';
import { Store, select } from '@ngrx/store';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromTodoActions from '@actions/todo';
import * as fromCalendarActions from '@actions/calendar';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { Observable } from 'rxjs';
import { AppState } from '@states/app';
import { Day } from '@month-models';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private route : ActivatedRoute, private store : Store<AppState>) {	}
	
	private month : number;
	private year = 2019;
	
	public CurrentDays$ : Observable<Day[]>;
	public PreviousDays$ : Observable<Day[]>;
	public NextDays$ : Observable<Day[]>;

	public get Year() : number {
		return this.year;
	}

	public get MonthName() : string {
		return fromDateFunctions.GetMonthName(this.month);
	}

	public ngOnInit() : void {
		this.route.params.pipe(
			map((prms : Params) => {
				this.month = +prms.month;

				this.store.dispatch(fromCalendarActions.LoadMonthDays({ month : this.month, year : this.year }))
				this.store.dispatch(fromTodoActions.LoadMonthTodos())
			})
		).subscribe();

		this.CurrentDays$ = this.store.select('calendar').pipe(
			map(c => c.selectedMonthDays)
		);

		this.PreviousDays$ = this.store.select('calendar').pipe(
			map(c => c.previousMonthDays)
		);

		this.NextDays$ = this.store.select('calendar').pipe(
			map(c => c.nextMonthDays)
		);
	}

	public TodosByDay(dayIndex : number) : Observable<ToDoItem[]> {
		return this.store.pipe(select(fromTodoSelectors.selectTodosByMonthAndDay, { month : this.month, day : dayIndex }));
	}
}
