import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import * as fromDateExtns from '@extensions/date';
import { Day } from './day/day.model';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/reducers/app.reducer';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private route : ActivatedRoute, private store : Store<AppState>) {}
	
	private items : ToDoItem[];
	private monthNumber : number;
	private year = 2019;
	
	public DisplayDays : Day[];
	public get Year() : number {
		return this.year;
	}

	public get MonthName() : string {
		return fromDateExtns.GetMonthName(this.monthNumber);
	}

	public get MonthItems() : ToDoItem[] {
		return this.items;
	}

	public ngOnInit() : void {
		this.route.params.pipe(
			switchMap((prms : Params) => {
				this.monthNumber = +prms.monthNumber;
				this.DisplayDays = [
					...fromDateExtns.GetPreviousMonthLastDays(this.year, this.monthNumber).map(dayNum => new Day(dayNum, false)),
					...fromDateExtns.GetCurrentMonthDays(this.year, this.monthNumber).map(dayNum => new Day(dayNum, true)),
					...fromDateExtns.GetNextMonthFirstDays(this.year, this.monthNumber).map(dayNum => new Day(dayNum, false)) ];

				return this.store;
			}),
			map((s) => {
				console.log("YEEAH");
				
				console.log(this.items);
				
				this.items = s.todo.items.filter(i => i.Date.getMonth() + 1 === this.monthNumber);
			})
		).subscribe();
	}
}
