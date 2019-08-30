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

	constructor(private route : ActivatedRoute) {}

	private monthNumber : number;
	private year = 2019;
	public DisplayDays : number[];

	public MonthName(index : number) : string {
		if (index < 1 || index > 12) {
			return null;
		}

		return monthNames[index - 1];
	}

	private getFirstDayPosition(year : number, month : number) : number {
		return new Date(year, month, 1).getDay();
	}

	private getNumberOfDaysThisMonth() : number {
		return this.getNumberOfDaysInMonth(this.year, this.monthNumber);
	}

	private getNumberOfDaysPrevMonth() : number {
		return this.getNumberOfDaysInMonth(this.year, this.monthNumber - 1);
	}

	private getNextMonthFirstDays() : number[] {
		const arr = [];
console.log(this.getFirstDayPosition(this.year, this.monthNumber + 1));

		for (let i = 1; i < 8 - this.getFirstDayPosition(this.year, this.monthNumber + 1); i++) {
			arr.push(i);
		}

		return arr;
	}

	private getNumberOfDaysInMonth(year : number, monthNumber : number) : number {
		return new Date(year, monthNumber, 0).getDate();
	}

	private getCurrentMonthDays() : number[] {
		const arr = [];

		for (let i = 1; i <= this.getNumberOfDaysThisMonth(); i++) {
			arr.push(i);
		}

		return arr;
	}

	private getPreviousMonthLastDays() : number[] {
		const arr = [];
		let maxDay = this.getNumberOfDaysPrevMonth();

		for (let i = 1; i < this.getFirstDayPosition(this.year, this.monthNumber); i++) {
			arr.push(maxDay--);
		}

		return arr.reverse();
	}

	public ngOnInit() : void {
		this.route.params.pipe(
			map((prms : Params) => {
				this.monthNumber = +prms.monthNumber;
				this.DisplayDays = [
					...this.getPreviousMonthLastDays(),
					...this.getCurrentMonthDays(),
					...this.getNextMonthFirstDays() ];
			})
		).subscribe();
	}
}
