import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCalendarActions from '@actions/calendar';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromTodoActions from '@actions/todo';

import { Todo } from '@todo-models';
import { TodosState } from '@states/todo';
import { Subject, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CalendarModes } from '@states/calendar';

@Component({
	selector: 'app-day',
	templateUrl: './day.component.html',
	styleUrls: ['./day.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DayComponent {
	
	constructor(private store : Store<TodosState>) {
		this.toggleClickSubj.pipe(
			// debounceTime(100),
			map((id : string) => this.store.dispatch(fromTodoActions.ToggleDone({ id })))
		).subscribe();
	}

	private toggleClickSubj = new Subject<string>();

	public IsDayInMode$(mode : CalendarModes) : Observable<boolean> {
		return this.store.pipe(
			select(fromCalendarSelectors.selectedDate),
			withLatestFrom(this.store.select(fromCalendarSelectors.selectedMode)),
			map(([date, curMode]) => curMode === mode && this.Date && date && 
				date.getMonth() === this.Date.getMonth() && date.getFullYear() === this.Date.getFullYear() && 
				date.getDate() === this.Date.getDate())
		);
	}

	public IsCurrentMonth$ : Observable<boolean> = this.store.pipe(
		select(fromCalendarSelectors.selectedMonth),
		map(m => this.Date.getMonth() + 1 === m)
	)

	public IsItemEditing$(id : number) : Observable<boolean> {
		return this.store.select(fromCalendarSelectors.selectedTodo).pipe(
			map(selectedTodo => selectedTodo && selectedTodo.id === id)
		)
	}

	@Input()
	public Date : Date;
	@Input()
	public Items : Todo[];

	public get DayNumber() : number {
		return this.Date ? this.Date.getDate() : 0
	}

	public get VisibleItems() : Todo[] {
		return this.Items.filter(i => i.Visible);
	}

	public get InvisibleItems() : Todo[] {
		return this.Items.filter(i => !i.Visible);
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
		this.store.dispatch(fromCalendarActions.SelectDayToAdd({ date : this.Date }));
	}

	public OnDaySelectedToView() : void {
		this.store.dispatch(fromCalendarActions.SelectDayToView({ date : this.Date }));
	}
	
	public OnDeleteClick(id : number) : void {
		this.store.dispatch(fromTodoActions.DeleteTodoStart({ id }));
	}
}
