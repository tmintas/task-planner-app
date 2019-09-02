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

	private getNextMonthFirstDays() : number[] {
		const arr = [];
		const nextMonthFirstDayPosition = fromDateExtns.GetDayOfWeek( new Date(this.year, this.monthNumber + 1, 1) );

		// we don't want to get the whole week of next month if it starts from Monday
		if (nextMonthFirstDayPosition === 1) { return arr; }

		for (let i = 1; i <= 8 - nextMonthFirstDayPosition; i++) {
			arr.push(i);
		}

		return arr;
	}

	private getCurrentMonthDays() : number[] {
		const arr = [];
		const maxDayNumber = fromDateExtns.GetNumberOfDaysInMonth(this.year, this.monthNumber);

		for (let i = 1; i <= maxDayNumber; i++) {
			arr.push(i);
		}

		return arr;
	}

	private getPreviousMonthLastDays() : number[] {
		const arr = [];
		const firstDayPosition = fromDateExtns.GetDayOfWeek( new Date(this.year, this.monthNumber, 1) );

		let lastMonthMaxDay = fromDateExtns.GetNumberOfDaysInMonth(this.year, this.monthNumber - 1);

		for (let i = 1; i < firstDayPosition; i++) {
			arr.push(lastMonthMaxDay--);
		}

		return arr.reverse();
	}

	public ngOnInit() : void {
		console.log(fromDateExtns.GetDayOfWeek(new Date(2019, 7, 1)));
		this.route.params.pipe(
			map((prms : Params) => {
				this.monthNumber = +prms.monthNumber;
				this.DisplayDays = [
					...this.getPreviousMonthLastDays(),
					...this.getCurrentMonthDays(),
					...this.getNextMonthFirstDays() ];

				console.log('prev days ');
				console.log(this.getPreviousMonthLastDays());

				console.log('curr days ');
				console.log(this.getCurrentMonthDays());

				console.log('next days ');
				console.log(this.getNextMonthFirstDays());
			})
		).subscribe();
	}
}
