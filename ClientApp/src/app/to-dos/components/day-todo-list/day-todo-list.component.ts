import { Component, OnInit } from '@angular/core';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromCalendarActions from '@actions/calendar';
import * as fromTodoActions from '@actions/todo';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import AppState from '@states/app';
import { Todo } from '@todo-models';
import { filter, switchMap } from 'rxjs/operators';
import { selectedDate, selectedDayNumber } from '@selectors/calendar';
import { CalendarModes } from '@states/calendar';

@Component({
	selector: 'app-day-todo-list',
  	templateUrl: './day-todo-list.component.html',
  	styleUrls: ['./day-todo-list.component.scss']
})
export class DayTodoListComponent implements OnInit {

	public Todos$ : Observable<Todo[]>;
  	public SelectedDay$ : Observable<number> = this.store.pipe(select(selectedDayNumber));

  	constructor(private store : Store<AppState>) { }

	public ngOnInit() : void {
		this.Todos$ = this.store.pipe(
			filter(state => state.calendar.mode === CalendarModes.ViewingDayItems),
			select(selectedDate),
			switchMap((date : Date) => {
				return this.store.select(fromTodoSelectors.selectTodosByDate, { date })
			})
      	);
   }

	public OnEditClick(item: Todo): void {
		this.store.dispatch(fromCalendarActions.EnterEditMode());
		this.store.dispatch(fromTodoActions.SelectItemForEdit({ item }));
	}

    public OnDeleteClick(id : number) : void {
        this.store.dispatch(fromTodoActions.DeleteTodo({ id }));
    }
}
