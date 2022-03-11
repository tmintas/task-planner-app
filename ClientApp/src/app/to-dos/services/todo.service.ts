import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '@todo-models';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Importance } from '../enums/importance.enum';
import * as dateHelper from '@shared-functions/date';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type':  'application/json' })
};

export const MAX_VISIBLE_ITEMS_PER_DAY = 4;

@Injectable({
	providedIn: 'root'
})
export class TodoService {
	private apiEndpoint : string = '/api/Todo';

	constructor(private http : HttpClient) {}

	GetUserTodos() : Observable<Todo[]> {
		return this.http.get<Todo[]>(this.apiEndpoint + '/user-todos').pipe(
			map(todos => {
				todos.map(t => {
					t.Visible = true;
					t.Date = dateHelper.transformToCurrentTimezone(t.Date);
				});
				return todos;
			}),
			take(1)
		);
	}

	CreateTodo(item : Todo) : Observable<Todo> {
		return this.http.post<Todo>(this.apiEndpoint, item, httpOptions).pipe(
			map((item : Todo) => {
				// for some reason item.Date is string, so map to date
				item.Date = new Date(item.Date);

				return item;
			})
		);
	}

	DeleteTodo(id : number) : Observable<{}> {
		const url = `${this.apiEndpoint}/${id}`;

		return this.http.delete(url);
	}

	UpdateTodo(id : number, changes : any) : Observable<Todo> {
		const url = `${this.apiEndpoint}/${id}`;
		return this.http.put<Todo>(url, changes, httpOptions);
	}

	// TODO fetch from backend
	GetImportanceOptions() : Observable<DropdownOption[]> {
		return of([
			{ Value : Importance.Low, DisplayName : "Low" },
			{ Value : Importance.Middle, DisplayName : "Middle" },
			{ Value : Importance.High, DisplayName : "High" }
		]);
	}

	ToggleDone(id : number) : Observable<void> {
		return this.http.put<void>(`${this.apiEndpoint}/toggle-done/${id}`, {}, httpOptions);
	}

	Get(id : number) : Observable<Todo> {
		return this.http.get<Todo>(`${this.apiEndpoint}/get-todo/${id}`).pipe(
			map(item => {
				item.Date = dateHelper.transformToCurrentTimezone(item.Date);

				return item;
			})
		);
	}

	SetInvisibleForOverflowingItems(items: Todo[]): Todo[] {
		console.log('set inv')
		const itemsCopy = [...items];
		const datesWithoutTime = itemsCopy.map(i => dateHelper.dismissTime(i.Date));
		const uniqueDates = dateHelper.getUniqueDates(datesWithoutTime);

		const todosGroupedByDay = uniqueDates.map(date => {
			let dayItems = itemsCopy.filter(i => dateHelper.areDatesEqual(i.Date, date));

			return dayItems
				.map((i,index) => {
					const itemCopy = { ...i } as Todo;
					itemCopy.Visible = index < MAX_VISIBLE_ITEMS_PER_DAY;
					
					return itemCopy;
				});
		});
		
		return todosGroupedByDay.flat();
	}
}
