import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToDoItem } from '@todo-models';
import { Observable } from 'rxjs';
import ToDoState from '@states/todo';
import { Store, select } from '@ngrx/store';

import * as fromTodoSelectors from '@selectors/todo';
import { map, take, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DayTodoListResolverService implements Resolve<ToDoItem[]> {
    constructor(
        private router: Router,
        private store: Store<ToDoState>
    ) {}
        
    resolve(route: ActivatedRouteSnapshot): Observable<ToDoItem[]> | Observable<never> {
        return this.store.pipe(
            delay(1000),
            select(fromTodoSelectors.selectTodosByMonthAndDay, { month : +route.paramMap.get('monthNumber'), day : +route.paramMap.get('dayNumber') }),
            take(1),
            map(todo => {
                if (todo) return todo;
                else {
                    this.router.navigate(['../']);
                    return null;
                }
            })
        );
    }
}
