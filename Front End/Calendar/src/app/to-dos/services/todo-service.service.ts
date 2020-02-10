import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToDoItem } from '@todo-models';
import { TodoItemDto } from '../models/to-do-item-dto.model';

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	constructor(private http : HttpClient) {}

	public GetAll() : Observable<ToDoItem[]> {
		return this.http.get<TodoItemDto[]>('http://localhost:3000/todos').pipe(
			map(dtos => {
				console.log('dtos:');
				console.log(dtos);
				
				console.log('models:');
				console.log(dtos.map(dto => new ToDoItem().Deserialize(dto)));
				
				return dtos.map(dto => new ToDoItem().Deserialize(dto))
			},
			take(1),
		));
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

	public DeleteTodo(id : number) : Observable<{}> {
		const url = `http://localhost:3000/todos/${id}`;

		return this.http.delete(url);
	}
}
