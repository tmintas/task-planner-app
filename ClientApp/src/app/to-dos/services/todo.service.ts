import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '@todo-models';
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
		console.log('service create start.. item is');
		console.log(item);
		
		
		return this.http.post<Todo>(this.apiEndpoint, item, httpOptions).pipe(
			map((item : Todo) => {
				item.Date = new Date(item.Date);
				console.log('service create map.. itemdto returned...');
				console.log(item);
				return item;

			})
		);
	}

	public DeleteTodo(id : number) : Observable<{}> {
		const url = `${this.apiEndpoint}/${id}`;

		return this.http.delete(url);
	}

	public Update(id : number, changes : any) : Observable<{}> {
		const url = `${this.apiEndpoint}/${id}`;

		return this.http.put(url, changes, httpOptions);
	}

	public GetImportanceOptions() : DropdownOption[] {
		return [
			{ Value : Importance.Low, DisplayName : "Low" },
			{ Value : Importance.Middle, DisplayName : "Middle" },
			{ Value : Importance.High, DisplayName : "High" }
		]
	}
}
