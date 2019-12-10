import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Day } from '../../models/day.model';
import { Importance } from 'app/to-dos/enums/importance.enum';
import { DeleteTodo } from '@actions/todo';
import { ToDoItem } from '@todo-models';
import ToDoState from '@states/todo';

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

	constructor(private store : Store<ToDoState>) { }

	public IsItemHighImportant(item : ToDoItem) : boolean {
		return item.Importance == Importance.High
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
		if (this.Items.length > 0) console.log(this.Items);
	 }

	public OnDelete(item : ToDoItem) : void{
		this.store.dispatch(DeleteTodo({ payload : item.Id }))
	}

	public ItemDisplayText(item : ToDoItem) : string {
		const minuteText = item.Time.minute < 10 ? `0${item.Time.minute}` : `${item.Time.minute}`;
		return `${item.Name} [${item.Time.hour}:${minuteText}]`;
	}
}
