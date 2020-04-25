import { Component, Input, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCalendarActions from '@actions/calendar';
import * as fromTodoActions from '@actions/todo';

import { Todo } from '@todo-models';
import { TodosState } from '@states/todo';

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
	public Items : Todo[];

	@ViewChild("dayRef", { static: true })
	public DayRef: ViewChild;

	public ToggleIcon(isDone : boolean) : string[] {
		return isDone ? ['fas', 'check-circle'] : ['far', 'circle'];
	}

	// TODO outsource to state
	public get NotVisibleCount() : number {
		if (!this.Items) return 0; 
		 
		return this.Items.filter(el => !el.Visible).length;
	}

	constructor(private store : Store<TodosState>, private elRef: ElementRef) { }

	public OnEditClick(item : Todo) : void {
		this.store.dispatch(fromCalendarActions.SelectItemForEdit({ item }));
	}

	public ToggleDone(id : string) {
		this.store.dispatch(fromTodoActions.ToggleDone({ id }))
	}

	public OnDaySelectedToAdd() : void {
		this.store.dispatch(fromCalendarActions.SelectDayToAdd({ day : this.DayNumber }));
	}

	public OnDaySelectedToView() : void {
		this.store.dispatch(fromCalendarActions.SelectDayToView({ day : this.DayNumber }));
	}
	
	public OnDeleteClick(id : number) : void {
		this.store.dispatch(fromTodoActions.DeleteTodoStart({ id }));
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
}
