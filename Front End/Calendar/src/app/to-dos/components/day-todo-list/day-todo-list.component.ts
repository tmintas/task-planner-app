import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '@todo-models';
import ToDoState from '@states/todo';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import * as fromTodoSelectors from '@selectors/todo';
import { Observable } from 'rxjs';
import { AppState } from '@states/app.state';
import { AppState } from '@states/app.state';

@Component({
	selector: 'app-day-todo-list',
	templateUrl: './day-todo-list.component.html',
	styleUrls: ['./day-todo-list.component.scss']
})
export class DayTodoListComponent implements OnInit {

	public Todos$ : Observable<ToDoItem[]>;
	public IsLoading$ : Observable<boolean>;

	constructor(private store : Store<AppState>, private route : ActivatedRoute) { }

	public ngOnInit() : void {
		this.Todos$ = this.route.params.pipe(
			switchMap(params => this.store.select(
				fromTodoSelectors.selectTodosByMonthAndDay,
				{
					month : +params['month'],
					day : +params['day']
				})
			)
		);
	}
}
