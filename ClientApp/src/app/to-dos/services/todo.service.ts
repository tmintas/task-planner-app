import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
	private apiEndpoint : string = '/api/Todo';

	constructor(private http : HttpClient) {}

	public GetUserTodos() : Observable<Todo[]> {
		// Todo get viewmodels instead of dtos
		return this.http.get<Todo[]>(this.apiEndpoint + '/user-todos').pipe(
			map(todos => {
				todos.map(d => {
					d.Date = new Date(d.Date);
					d.Visible = true;
				});
				return todos;
			}),
			take(1)
		);
	}

	public CreateTodo(item : Todo) : Observable<Todo> {

		return this.http.post<Todo>(this.apiEndpoint, item, httpOptions).pipe(
			map((item : Todo) => {
				//for some reason item.Date is string, so map to date is needed
				item.Date = new Date(item.Date);

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

	public ToggleDone(id : string) : Observable<void> {
		return this.http.put<void>(`${this.apiEndpoint}/toggle-done/${id}`, {}, httpOptions);
	}

	public Get(id : number) : Observable<Todo> {
		return this.http.get<Todo>(`${this.apiEndpoint}/${id}`).pipe(
			map(item => {
				// string to Date
				item.Date = new Date(item.Date);
				return item;
			})
		);
	}

}
