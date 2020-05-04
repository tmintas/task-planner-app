import { Component, OnInit } from '@angular/core';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromRouterSelectos from '@selectors/router';
import * as fromCalendarActions from '@actions/calendar';
import * as fromTodoActions from '@actions/todo';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import AppState from '@states/app';
import { Todo } from '@todo-models';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-day-todo-list',
	templateUrl: './day-todo-list.component.html',
	styleUrls: ['./day-todo-list.component.scss']
})
export class DayTodoListComponent implements OnInit {

	public Todos$ : Observable<Todo[]>;
	public SelectedDay$ : Observable<number> = this.store.pipe(select(fromRouterSelectos.getSelectedDay));

	constructor(private store : Store<AppState>) { }

	public ngOnInit() : void {
		this.Todos$ = this.store.pipe(
			select(fromRouterSelectos.getDateParams),
			switchMap((prms : { day : number, month : number, year : number }) => 
				this.store.select(fromTodoSelectors.selectTodosByDate, { date : new Date(prms.year, prms.month -1, prms.day) })
			)
		);
	}

	public OnEditClick(item : Todo) : void {
		this.store.dispatch(fromCalendarActions.SelectItemForEdit({ item }));
	}

	public OnDeleteClick(id : number) : void {
		this.store.dispatch(fromTodoActions.DeleteTodoStart({ id }));
	}
}
