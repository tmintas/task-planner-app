import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

	@Input()
	public Days: number[];

	constructor() { }

	ngOnInit() { }

}
