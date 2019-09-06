import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Day } from '../day/day.model';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {

	@Input()
	public Days : Day[];
}
