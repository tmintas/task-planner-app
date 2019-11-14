import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Day } from './day.model';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { Importance } from 'app/to-dos/enums/importance.model';

@Component({
	selector: 'app-day',
	templateUrl: './day.component.html',
	styleUrls: ['./day.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DayComponent implements OnInit {

	@Input()
	public Day : Day;
	@Input()
	public Items : ToDoItem[];

	public IsItemHighImportant(item : ToDoItem) : boolean {
		return item.Importance === Importance.High
	}

	public IsItemMidmportant(item : ToDoItem) : boolean {
		return item.Importance == Importance.Middle
	}

	public IsItemLowImportant(item : ToDoItem) : boolean {
		return item.Importance == Importance.Low
	}

	public get DayNumber() : number {
		return this.Day ? this.Day.Index : 0;
	}

	ngOnInit() : void {
		console.log('[Day] Init');
		
		console.log(`${this.DayNumber}  items:  `);		
		console.log(this.Items);
		
	}
}
