import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, pluck, distinct, distinctUntilChanged } from 'rxjs/operators';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromTodoSelectors from '@selectors/todo';

import { Importance } from '@todo-enums';
import { CreateTodo } from '@actions/todo';
import { ToDoItem } from '@todo-models';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Observable, of } from 'rxjs';
import AppState from '@states/app';

@Component({
	selector: 'app-edit-todo-item',
	templateUrl: './edit-todo-item.component.html',
	styleUrls: ['./edit-todo-item.component.scss']
})
export class EditTodoItemComponent implements OnInit {
	private month : number;

	public ImportanceOptions$ : Observable<DropdownOption[]> = this.store.select(fromTodoSelectors.selectImportanceOptions);
	public ToDoForm : FormGroup;

	constructor(private fb : FormBuilder, private route : ActivatedRoute, private store : Store<AppState>) {
		this.ToDoForm = this.fb.group({
			Date : [null, Validators.required],
			Time: [null],
			Name: [null, [Validators.required, Validators.maxLength(10)]],
			Description: [null],
			Importance: [null]
		});
	}

	public ngOnInit() : void {
		this.month = parseInt(this.route.snapshot.paramMap.get('month'));
		this.patchFromUrl();

		// handle date changes
		this.route.params.pipe(
			pluck('day'),
			distinct(),
			map(() => this.patchFromUrl())
		).subscribe();

		// handle item id changes
		this.route.params.pipe(
			pluck('itemId'),
			distinctUntilChanged(),
			switchMap(prm => {
				const itemId = parseInt(prm, 10);

				return this.store.pipe(map((s) => s.todo.items.find(i => i.Id === itemId)));
			}),
			map((item : ToDoItem) => {
				if (item) { 
					this.patchFromItem(item); 
				} else {
					this.patchFromUrl();
				}
			})
		).subscribe();
		
		const itemId = +this.route.snapshot.params['itemId'];
		this.store.pipe(
			map((s) => {
				const item = s.todo.items.filter(i => i.Id === itemId);
				console.log(item);						
			})
		).subscribe();
	}

	private patchFromUrl() : void {
		const urlDay = parseInt(this.route.snapshot.paramMap.get('day'), 10) || 1;
		const date = new NgbDate(2019, this.month, urlDay);

		this.ToDoForm.patchValue({
			Date : date
		});
	}

	private patchFromItem(item : ToDoItem) : void {
		const date = new NgbDate(item.Date.year, item.Date.month, item.Date.day);
		const time = { hour : item.Time.hour, minute : item.Time.minute };

		this.ToDoForm.patchValue({
			Date : date,
			Time: time,
			Name: item.Name,
			Description: item.Description,
			Importance: item.Importance
		});
	}

	// private resetToDft() : void {
	// 	const dftImportance = Importance.Middle;
	// 	const dftTime = { hour: 12, minute : 0 };
	// 	const dftDate = new NgbDate(2019, this.month, this.day);
		
	// 	this.ToDoForm.reset();
	// 	this.ToDoForm.patchValue({
	// 		Date : dftDate,
	// 		Time: dftTime,
	// 		Importance: dftImportance
	// 	});
	// }

	public OnSave() : void {
		this.ToDoForm.markAllAsTouched();
		if (this.ToDoForm.invalid) { return; }

		const item : ToDoItem = this.mapToTodo();
		this.store.dispatch(CreateTodo({ item } ));
	}

	private mapToTodo() : ToDoItem
	{

		return new ToDoItem().Deserialize(this.ToDoForm.value)
	}

	public HasError(controlName : string) : boolean {
		return this.ToDoForm.get(controlName).touched && this.ToDoForm.get(controlName).errors !== null;
	}

	public ErrorName(controlName : string) : string {
		if (!this.HasError(controlName)) { return; }

		const errObj = this.ToDoForm.get(controlName).errors;

		switch (Object.keys(errObj)[0]) {
			case 'required':
				return 'Please fill out this field';
			case 'maxlength':
				return 'Maximum 10 symbols';
			case 'ngbDate':
				return 'Invalid date format';
			default:
				return;
		}
	}
}
