import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

import * as fromDateExtns from '@extensions/date';
import { Day } from './day/day.model';
import { Store, select } from '@ngrx/store';
// import * as fromTodoState from '../store/states/todo.state';
import * as fromTodoSelectors from '../store/selectors/todo.selector';
import ToDoState from '../store/states/todo.state';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private route : ActivatedRoute, private store : Store<ToDoState>) {	}
	
	private monthNumber : number;
	private year = 2019;
	
	// public Items$ : Observable<ToDoItem[]>;
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
			})
		).subscribe();

		this.store.pipe(
			map(s => {
				console.log(s);
			})
		).subscribe();
	}

	public TodosByDay(dayIndex : number) : Observable<ToDoItem[]> {
		return this.store.pipe(select(fromTodoSelectors.selectTodosByMonthAndDay, { month : this.monthNumber, day : dayIndex }));
	}
}
