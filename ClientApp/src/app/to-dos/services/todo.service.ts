import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '@todo-models';
import { TodoItemDto } from '../models/to-do-item-dto.model';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Importance } from '../enums/importance.enum';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type':  'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	constructor(private http : HttpClient) {}

	public GetAll() : Observable<Todo[]> {
		// Todo get viewmodels instead of dtos
		return this.http.get<TodoItemDto[]>('http://localhost:3000/Todos').pipe(
			map(dtos => dtos.map(dto => Todo.GetFromDto(dto)),
		));
	}

	public CreateTodo(item : Todo) : Observable<Todo> {
		return this.http.post<TodoItemDto>('http://localhost:3000/Toddos', Todo.MapToDto(item), httpOptions).pipe(
			map((itemDto) => {
				item.id = itemDto.id; 
				return item;
			})
		);
	}

	public DeleteTodo(id : number) : Observable<{}> {
		const url = `http://localhost:3000/Todoss/${id}`;

		return this.http.delete(url);
	}

	public Update(id : number, changes : any) : Observable<Todo> {
		const url = `http://localhost:3000/Toddos/${id}`;

		return this.http.put<TodoItemDto>(url, Todo.MapToDto(changes), httpOptions).pipe(
			map(dto => Todo.GetFromDto(dto))
		);
	}

	public GetImportanceOptions() : DropdownOption[] {
		return [
			{ Value : Importance.Low, DisplayName : "Low" },
			{ Value : Importance.Middle, DisplayName : "Middle" },
			{ Value : Importance.High, DisplayName : "High" }
		]
	}
}
