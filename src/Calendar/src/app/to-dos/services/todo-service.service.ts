import { Injectable } from '@angular/core';
import { ToDoItem } from '@todo-models';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Importance } from '@todo-enums';
import { Observable, of } from 'rxjs';
import { delay } from 'q';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor() { }

    public getMonthTodos(): Observable<ToDoItem[]> {
        return  delay(1000),
                of([
                    new ToDoItem(new NgbDate(2019, 5, 5), { hour: 12, minute: 0, second: 1 }, "namete", "destest", Importance.High, 0),
                    new ToDoItem(new NgbDate(2019, 5, 5), { hour: 12, minute: 0, second: 1 }, "namete", "destest", Importance.High, 0)
                   ])
            
    }
}
