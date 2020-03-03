import { Injectable } from '@angular/core';
import { ToDoItem } from '@todo-models';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Importance } from '@todo-enums';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	public static items = [
		new ToDoItem(new NgbDate(2019, 5, 5), { hour: 12, minute: 0, second: 1 }, 'namet32e', 'destest', Importance.High, 0),
		new ToDoItem(new NgbDate(2019, 5, 5), { hour: 12, minute: 0, second: 1 }, 'namete', 'destest', Importance.High, 1)
	];

	public GetMonthTodos() : Observable<ToDoItem[] > {
		return  of(TodoService.items).pipe(delay(400));
	}

	public GetDayTodos() : Observable<ToDoItem[] > {
		return  of(TodoService.items).pipe(delay(400));
	}

	public GetById(id : number) : Observable<ToDoItem> {
		return  of(TodoService.items[0]).pipe(delay(400));
	}

	public CreateTodo(item : ToDoItem) : Observable<ToDoItem> {
		TodoService.items.push(item);

		return of(item).pipe(delay(400));
	}

	public DeleteTodo(id : number) : Observable<number> {
		TodoService.items.splice(id, 1);

		return of(id).pipe(delay(400));
	}
}
