import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

const monthNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'];

@Component({
	selector: 'app-month',
	templateUrl: './month.component.html',
	styleUrls: ['./month.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MonthComponent implements OnInit {

	constructor(private route: ActivatedRoute) {}

	private monthNumber: number;
	private year = 2019;
	public DisplayDays: number[];

	public MonthName(index: number): string {
		if (index < 1 || index > 12) {
			return null;
		}

		return monthNames[index - 1];
	}

	private getFirstDayPosition(year: number, month: number) {
		return new Date(year, month - 1, 1).getDay();
	}

	private getNumberOfDaysThisMonth(year: number, month: number) {
		return new Date(year, month, 0).getDate();
	}

	private getNumberOfDaysPrevMonth(year: number, month: number) {
		return new Date(year, month - 2, 0).getDate();
	}

	private getCurrentMonthDays(year: number, month: number): number[] {
		const arr = [];

		for (let i = 1; i <= this.getNumberOfDaysThisMonth(year, month); i++) {
			arr.push(i);
		}

		return arr;
	}

	private getPreviousMonthLastDays(year: number, month: number): number[] {
		const arr = [];
		let maxDay = this.getNumberOfDaysPrevMonth(year, month);

		for (let i = 1; i < this.getFirstDayPosition(year, month); i++) {
			arr.push(maxDay--);
		}

		return arr.reverse();
	}

	public ngOnInit() {
		this.route.params.pipe(
			map((prms: Params) => {
				this.monthNumber = prms.monthNumber;
				this.DisplayDays = [
					...this.getPreviousMonthLastDays(2019, this.monthNumber),
					...this.getCurrentMonthDays(this.year, this.monthNumber) ];
			})
		).subscribe();
	}
}
