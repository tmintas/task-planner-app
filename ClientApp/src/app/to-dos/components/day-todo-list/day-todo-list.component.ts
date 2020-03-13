import { Component, OnInit } from '@angular/core';
// import * as fromTodoSelectors from '@selectors/todo';
// import * as fromRouterSelectos from '@selectors/router';


@Component({
	selector: 'app-day-todo-list',
	templateUrl: './day-todo-list.component.html',
	styleUrls: ['./day-todo-list.component.scss']
})
export class DayTodoListComponent implements OnInit {

	// public Todos$ : Observable<TodosState>;

	constructor() { }

	public ngOnInit() : void {
		// this.Todos$ = this.store.pipe(
		// 	// select(fromRouterSelectos.getDateParams),
		// 	// switchMap((prms : { day : number, month : number, year : number }) => 
		// 	// 	this.store.select(fromTodoSelectors.selectTodosByMonthAndDay,
		// 	// 	{
		// 	// 		month : prms.month,
		// 	// 		day : prms.day
		// 	// 	})
		// 	// )
		// );
	}
}
