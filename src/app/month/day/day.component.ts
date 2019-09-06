import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Day } from './day.model';

@Component({
	selector: 'app-day',
	templateUrl: './day.component.html',
	styleUrls: ['./day.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DayComponent {
	@Input()
	public Day : Day;

	public get DayNumber() : number {
		return this.Day ? this.Day.Index : 0;
	}
}
