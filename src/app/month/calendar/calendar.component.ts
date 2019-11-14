import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Day } from '../day/day.model';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
	ngOnInit(): void {
		console.log('[Calendar]');
		console.log(`received for ${this.MonthName} `);
		console.log(this.MonthItems);		
	}

	@Input()
	public Days : Day[];

	@Input()
	public MonthItems : ToDoItem[];

	@Input()
	public MonthName : string;

	public DayItems(day : number) : ToDoItem[] 
	{		
		return this.MonthItems.filter(i => i.Date.getDate() === day);
	}
}
