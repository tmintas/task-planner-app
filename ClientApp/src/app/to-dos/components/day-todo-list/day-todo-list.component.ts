import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import AppState from '@states/app';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromRouterSelectos from '@selectors/router';

import { ToDoItem } from '@todo-models';

@Component({
	selector: 'app-day-todo-list',
	templateUrl: './day-todo-list.component.html',
	styleUrls: ['./day-todo-list.component.scss']
})
export class DayTodoListComponent implements OnInit {

	public Todos$ : Observable<ToDoItem[]>;

	constructor(private store : Store<AppState>) { }

	public ngOnInit() : void {
		this.Todos$ = this.store.pipe(
			select(fromRouterSelectos.getDateParams),
			switchMap((prms : { day : number, month : number, year : number }) => 
				this.store.select(fromTodoSelectors.selectTodosByMonthAndDay,
				{
					month : prms.month,
					day : prms.day
				})
			)
		);
	}
}
