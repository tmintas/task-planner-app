import { Component, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCalendarActions from '@actions/calendar';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromTodoActions from '@actions/todo';

import { Todo } from '@todo-models';
import { TodosState } from '@states/todo';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CalendarModes } from '@states/calendar';
import { selectedMode } from '@selectors/calendar';

@Component({
	selector: 'app-day',
	templateUrl: './day.component.html',
	styleUrls: ['./day.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DayComponent implements OnChanges {
	private toggleClickSubj = new Subject<string>();

	public IsCurrentMonth$ : Observable<boolean>;
	
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

	public get selMode() {
		return this.store.select(selectedMode) ;
	}

	public get selDate() {
		return this.store.select(fromCalendarSelectors.selectedDate) ;
	}

	public get InvisibleItems() : Todo[] {
		return this.Items.filter(i => !i.Visible);
	}

	constructor(private store : Store<TodosState>) {
		this.toggleClickSubj.pipe(
			tap((id : string) => this.store.dispatch(fromTodoActions.ToggleDone({ id })))
		).subscribe();
	}

	public ngOnChanges() : void {
		this.IsCurrentMonth$ = this.store.pipe(
			select(fromCalendarSelectors.isMonthSelected, { month : this.Date.getMonth() })
		)
	}

	public IsDayInMode$(mode : CalendarModes) : Observable<boolean> {
		return this.store.pipe(select(fromCalendarSelectors.isDayInMode, { mode, date : this.Date }));
	}

	public IsItemEditing$(id : number) : Observable<boolean> {
		// return this.store.select(fromCalendarSelectors.selectedTodo).pipe(
		// 	map(selectedTodo => selectedTodo && selectedTodo.id === id)
		// )

		return this.store.select(fromCalendarSelectors.isItemEditing, { id });
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
