import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCalendarActions from '@actions/calendar';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromTodoActions from '@actions/todo';

import { Todo } from '@todo-models';
import { TodosState } from '@states/todo';
import { Observable } from 'rxjs';
import { CalendarModes } from '@states/calendar';
import { ResetSelectedTodo } from "@actions/todo";

@Component({
	selector: 'app-day',
	templateUrl: './day.component.html',
	styleUrls: ['./day.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent {
	@Input()
	public Date : Date;
	@Input()
	public Items : Todo[];

	public IsCurrentMonth$ : Observable<boolean>;
	public IsDayInViewMode$ : Observable<boolean>;
	public IsDayInAddMode$ : Observable<boolean>;

	public get VisibleItems() : Todo[] {
		return this.Items.filter(i => i.Visible);
	}

	public get InvisibleItems() : Todo[] {
		return this.Items.filter(i => !i.Visible);
	}
	constructor(private store : Store<TodosState>) {
	}

	public ngOnInit() : void {
		this.IsCurrentMonth$ = this.store.select(fromCalendarSelectors.isMonthSelected, { month : this.Date.getMonth() });
		this.IsDayInViewMode$ = this.store.select(fromCalendarSelectors.isDayInMode, { mode: CalendarModes.ViewingDayItems, date: this.Date });
		this.IsDayInAddMode$ = this.store.select(fromCalendarSelectors.isDayInMode, { mode: CalendarModes.AddTodo, date: this.Date });
	}

	// TODO can be replaced with directive
	public IsItemEditing$(id : number) : Observable<boolean> {
		return this.store.select(fromTodoSelectors.isItemEditing, { id });
	}

	// TODO can be replaced with directive
	public ToggleIconName(isDone : boolean) : string[] {
		return isDone ? ['fas', 'check-circle'] : ['far', 'circle'];
	}

	public OnEditClick(item: Todo) : void {
		this.store.dispatch(fromCalendarActions.EnterEditMode());
		this.store.dispatch(fromTodoActions.SelectItemForEdit({ item }));
	}

	public ToggleDone(id : number) {
		this.store.dispatch(fromTodoActions.ToggleDone({ id }));
	}

	public OnDaySelectedToAdd() : void {
		this.store.dispatch(fromCalendarActions.SelectDayToAdd({ date : this.Date }));
		this.store.dispatch(ResetSelectedTodo());
	}

	public OnDaySelectedToView() : void {
		this.store.dispatch(fromCalendarActions.SelectDayToView({ date: this.Date }));
		this.store.dispatch(ResetSelectedTodo());
	}

	public OnDeleteClick(item: Todo) : void {
		console.log(item)
		this.store.dispatch(fromTodoActions.DeleteTodo({ id: item.id }));
		// this.store.dispatch(ResetSelectedTodo());
		// this.store.dispatch(fromCalendarActions.SelectDayToView({ date: item.Date }));
	}
}
