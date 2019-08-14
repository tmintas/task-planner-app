import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent {

	private monthNumber = 5;
	private year = 2019;
	private firstDayDate: Date = new Date(this.year, this.monthNumber, 1);
	private firstDayPosition = this.firstDayDate.getDay();
	// private lastMondayOfPreviousMonth =
	private daysInPrevMonth = new Date(this.year, this.monthNumber - 1, 0).getDate();

	private get prevMonthLastDays(): number[] {
		const arr = new Array(this.firstDayPosition - 1);

		for (let i = 0; i <= this.firstDayPosition - 2; i++) {
			arr.push(this.daysInPrevMonth - i);
		}

		return arr.reverse();
	}

	public MonthDays: number[] = [ ...this.prevMonthLastDays, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
		19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 ];
}
