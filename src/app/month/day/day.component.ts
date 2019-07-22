import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-day',
	templateUrl: './day.component.html',
	styleUrls: ['./day.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DayComponent {
	@Input()
	public DayNumber: number;
}
