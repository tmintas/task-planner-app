import { Component, OnInit } from '@angular/core';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromRouterSelectos from '@selectors/router';
import * as fromCalendarSelectos from '@selectors/calendar';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import AppState from '@states/app';
import { Todo } from '@todo-models';

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
				this.store.select(fromTodoSelectors.selectTodosByMonthAndDay, { month : prms.month, day : prms.day })
			)
		);
	}
}
