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
	private apiEndpoint : string = 'https://localhost:44378/api/Todo';

	constructor(private http : HttpClient) {}

	public GetAll() : Observable<Todo[]> {
		// Todo get viewmodels instead of dtos
		return this.http.get<Todo[]>(this.apiEndpoint).pipe(
			map(todos => {
				todos.map(d => {
					d.Date = new Date(d.Date);
					d.Visible = true;
				});

				return todos;
			}
		));
	}

	public CreateTodo(item : Todo) : Observable<Todo> {
		return this.http.post<TodoItemDto>(this.apiEndpoint, item, httpOptions).pipe(
			map((itemDto) => {
				item.id = itemDto.id; 
				return item;
			})
		);
	}

	public DeleteTodo(id : number) : Observable<{}> {
		const url = `${this.apiEndpoint}/${id}`;

		return this.http.delete(url);
	}

	public Update(id : number, changes : any) : Observable<Todo> {
		const url = `${this.apiEndpoint}/${id}`;

		return this.http.put<TodoItemDto>(url, changes, httpOptions);
	}

	public GetImportanceOptions() : DropdownOption[] {
		return [
			{ Value : Importance.Low, DisplayName : "Low" },
			{ Value : Importance.Middle, DisplayName : "Middle" },
			{ Value : Importance.High, DisplayName : "High" }
		]
	}
}
