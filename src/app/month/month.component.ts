import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	private monthNumber = 5;
	private year = 2019;
	private firstDayPosition: number = new Date(this.year, this.monthNumber, 1).getDay();
	private numberOfDaysThisMonth = new Date(this.year, this.monthNumber, 0).getDate();
	private numberOfDaysPrevMonth = new Date(this.year, this.monthNumber - 1, 0).getDate();

	public DisplayDays: number[] = [ ...this.previousMonthLastDays, ...this.currentMonthDays ];

	private get currentMonthDays(): number[] {
		const arr = [];

		for (let i = 1; i <= this.numberOfDaysThisMonth; i++) {
			arr.push(i);
		}

		return arr;
	}

	private get previousMonthLastDays(): number[] {
		const arr = [];

		for (let i = 1; i < this.firstDayPosition; i++) {
			arr.push(this.numberOfDaysPrevMonth--);
		}

		return arr.reverse();
	}

	public ngOnInit() { }
}
