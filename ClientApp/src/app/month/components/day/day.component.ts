import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCalendarActions from '@actions/calendar';
import * as fromTodoActions from '@actions/todo';

import { Todo } from '@todo-models';
import { TodosState } from '@states/todo';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-day',
	templateUrl: './day.component.html',
	styleUrls: ['./day.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DayComponent {

	private toggleClickSubj = new Subject<string>();
	private toggleClick$ = this.toggleClickSubj.asObservable();

	@Input()
	public DayNumber : number;
	@Input()
	public Items : Todo[];

	public get VisibleItems() : Todo[] {
		return this.Items.filter(i => i.Visible);
	}

	public get InvisibleItems() : Todo[] {
		return this.Items.filter(i => !i.Visible);
	}
	
	constructor(private store : Store<TodosState>) {
		this.toggleClick$.pipe(
			// debounceTime(100),
			map((id : string) => this.store.dispatch(fromTodoActions.ToggleDone({ id })))
		).subscribe();
	}

	public ToggleIcon(isDone : boolean) : string[] {
		return isDone ? ['fas', 'check-circle'] : ['far', 'circle'];
	}

	public OnEditClick(item : Todo) : void {
		this.store.dispatch(fromCalendarActions.SelectItemForEdit({ item }));
	}

	public ToggleDone(id : string) {
		this.toggleClickSubj.next(id)
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
}
