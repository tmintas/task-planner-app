import { Component, Input, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

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
export class DayComponent implements OnChanges {

	@Input()
	public DayNumber : number;
	@Input()
	public Items : ToDoItem[];

	@ViewChild("dayRef", { static: true })
	public DayRef: ViewChild;

	public get NotVisibleCount() : number {
		if (!this.Items) return 0; 
		 
		return this.Items.filter(el => !el.Visible).length;
	}

	constructor(private store : Store<ToDoState>, private elRef: ElementRef) { }

	public IsItemHighImportant(item : ToDoItem) : boolean {
		return item.Importance == Importance.High
	}

	public IsItemMidmportant(item : ToDoItem) : boolean {
		return item.Importance == Importance.Middle
	}

	public IsItemLowImportant(item : ToDoItem) : boolean {
		return item.Importance == Importance.Low
	}

	ngOnChanges(changes: SimpleChanges) : void {
		// hide new todo item if overflowing the Day container
		const todoElements =  this.elRef.nativeElement.querySelectorAll(".todo-item");
		
		if (!todoElements || todoElements.length ===0 ) return;

		const lastBottomX = todoElements[todoElements.length - 1].getBoundingClientRect().bottom;
		const containerBottomCord = this.elRef.nativeElement.getBoundingClientRect().bottom;

		if (lastBottomX > containerBottomCord - 20) {
			changes.Items.currentValue[changes.Items.currentValue.length - 1].Visible = false;
		}
	}

	public OnDelete(id : number) : void {
		this.store.dispatch(DeleteTodo({ id }));
	}

	public ItemDisplayText(item : ToDoItem) : string {
		// TODO use pipe for that
		if (!item) return '';
		if (!item.Time || !item.Time.hour) return item.Name;

		const minuteText = item.Time.minute < 10 ? `0${item.Time.minute}` : `${item.Time.minute}`;
		return `${item.Name} [${item.Time.hour}:${minuteText}]`;
	}
}
