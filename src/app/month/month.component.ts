import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

import * as fromDateExtns from '@extensions/date';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private route : ActivatedRoute) {}

	public DisplayDays : number[];

	private monthNumber : number;
	private year = 2019;

	public get MonthName() : string {
		return fromDateExtns.GetMonthName(this.monthNumber);
	}

	public ngOnInit() : void {
		console.log(fromDateExtns.GetDayOfWeek(new Date(2019, 7, 1)));
		this.route.params.pipe(
			map((prms : Params) => {
				this.monthNumber = +prms.monthNumber;
				this.DisplayDays = [
					...fromDateExtns.GetPreviousMonthLastDays(this.year, this.monthNumber),
					...fromDateExtns.GetCurrentMonthDays(this.year, this.monthNumber),
					...fromDateExtns.GetNextMonthFirstDays(this.year, this.monthNumber) ];
			})
		).subscribe();
	}
}
