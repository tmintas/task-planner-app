import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Todo} from '@todo-models';
import {DropdownOption} from 'app/shared/models/dropdown-option.model';
import {Importance} from '../enums/importance.enum';
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

	public GetUserTodos() : Observable<Todo[]> {
		// Todo get viewmodels instead of dtos
		return this.http.get<Todo[]>(this.apiEndpoint + '/user-todos').pipe(
			map(todos => {
				todos.map(d => {
					d.Visible = true;

					// dates are store in UTC format in backend, so transform to current locale
					d.Date = new Date(d.Date);
					const offsetMs = d.Date.getTimezoneOffset() * 60 * 1000;
					d.Date.setTime(d.Date.getTime() - offsetMs);
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

	public Update(id : number, changes : any) : Observable<Todo> {
		const url = `${this.apiEndpoint}/${id}`;

		return this.http.put<Todo>(url, changes, httpOptions);
	}

	public GetImportanceOptions() : DropdownOption[] {
		return [
			{ Value : Importance.Low, DisplayName : "Low" },
			{ Value : Importance.Middle, DisplayName : "Middle" },
			{ Value : Importance.High, DisplayName : "High" }
		]
	}

	public ToggleDone(id : number) : Observable<void> {
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

	setInvisibleForOverflowingItems(items: Todo[]) {
		const datesWithoutTime = items.map(i => {
			let date = i.Date;
			
			return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
		});

		const uniqueDates = dateHelper.getUniqueDates(datesWithoutTime);
		const todosGroupedByDay = uniqueDates.map(date => {
			let dayItems = items.filter(i => dateHelper.areDatesEqual(i.Date, date));

			return dayItems
				.map((i,index) => {
					i.Visible = index < MAX_VISIBLE_ITEMS_PER_DAY;
					
					return i;
				});
		});
		
		return todosGroupedByDay.flat();
	}
}
