import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToDoItem } from '@todo-models';

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	constructor(private http : HttpClient) {}

	public GetAll() : Observable<ToDoItem[]> {
		return this.http.get<ToDoItem[]>('http://localhost:3000/todos').pipe(take(1));
	}

	// public GetDayTodos() : Observable<ToDoItem[] > {
	// 	return  of(TodoService.items).pipe(delay(400));
	// }

	// public GetById(id : number) : Observable<ToDoItem> {
	// 	return  of(TodoService.items[0]).pipe(delay(400));
	// }

	public CreateTodo(item : ToDoItem) : Observable<ToDoItem> {
		this.http.post('http://localhost:3000/todos', item);

		return of(item).pipe(delay(400));
	}

	// public DeleteTodo(id : number) : Observable<number> {
	// 	TodoService.items.splice(id, 1);

	// 	return of(id).pipe(delay(400));
	// }
}
