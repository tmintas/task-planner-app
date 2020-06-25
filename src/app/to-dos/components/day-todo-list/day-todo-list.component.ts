import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '@todo-models';
import ToDoState from '@states/todo';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as fromTodoSelectors from '@selectors/todo';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-day-todo-list',
	templateUrl: './day-todo-list.component.html',
	styleUrls: ['./day-todo-list.component.scss']
})
export class DayTodoListComponent implements OnInit {

	public Todos$ : Observable<ToDoItem[]>;
	public IsLoading$: Observable<boolean>;

	constructor(private store : Store<ToDoState>, private route : ActivatedRoute) { }

	public ngOnInit() : void {
		this.route.params.pipe(
			map(params => {
                this.Todos$ = this.store.pipe(
                    select(fromTodoSelectors.selectTodosByMonthAndDay, 
                    { 
                        month : +params['month'], 
                        day : +params['day'] 
                    }));
           	 	}
			)
		).subscribe();
	}

}
