import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

import * as fromDateExtns from '@extensions/date';
import { Day } from './day/day.model';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { Store, select } from '@ngrx/store';
import * as fromTodoState from '../store/state/todo.state';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private route : ActivatedRoute, private store : Store<fromTodoState.ToDoState>) {	}
	
	private monthNumber : number;
	private year = 2019;
	
	public Items$ : Observable<ToDoItem[]>;
	public DisplayDays : Day[];
	public get Year() : number {
		return this.year;
	}

	public get MonthName() : string {
		return fromDateExtns.GetMonthName(this.monthNumber);
	}

	public ngOnInit() : void {
		this.route.params.pipe(
			map((prms : Params) => {
				this.monthNumber = +prms.monthNumber;
				this.DisplayDays = [
					...fromDateExtns.GetPreviousMonthLastDays(this.year, this.monthNumber).map(dayNum => new Day(dayNum, false)),
					...fromDateExtns.GetCurrentMonthDays(this.year, this.monthNumber).map(dayNum => new Day(dayNum, true)),
					...fromDateExtns.GetNextMonthFirstDays(this.year, this.monthNumber).map(dayNum => new Day(dayNum, false)) ];

				this.Items$ = this.store.pipe(select(fromTodoState.selectTodosByMonth, { month : this.monthNumber }));
			})
		).subscribe();
	}
}
