import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { map, takeUntil, filter } from 'rxjs/operators';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromRouterSelectors from '@selectors/router';

import { Importance } from '@todo-enums';
import { CreateTodo, UpdateTodo } from '@actions/todo';
import { ToDoItem } from '@todo-models';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Observable, Subject } from 'rxjs';
import AppState from '@states/app';

@Component({
	selector: 'app-edit-todo-item',
	templateUrl: './edit-todo-item.component.html',
	styleUrls: ['./edit-todo-item.component.scss']
})
export class EditTodoItemComponent implements OnInit, OnDestroy {
	private itemId : number;
	private dftImportance : Importance = Importance.Low;
	private destroy$ : Subject<boolean> = new Subject<boolean>();
	private isAddMode : boolean;

	public ToDoForm : FormGroup;

	public ImportanceOptions$ : Observable<DropdownOption[]> = this.store.select(fromTodoSelectors.selectImportanceOptions);

	constructor(private fb : FormBuilder, private store : Store<AppState>) {
		this.ToDoForm = this.fb.group({
			Date : [null, Validators.required],
			Time: [null],
			Name: [null, [Validators.required, Validators.maxLength(10)]],
			Description: [null],
			Importance: [null]
		});
	}

	public ngOnInit() : void {
		this.store.pipe(
			select(fromRouterSelectors.getDateParamsFromRoute),
			map(({ year, month, day }) => this.patchDate(year, month, day))
		).subscribe();

		this.store.pipe(
			select(fromTodoSelectors.getSelectedTodo),
			map(item => { 
				this.isAddMode = item == null;
				return item;
			}),
			filter(item => item != null),
			map((item : ToDoItem) => 
			{
				this.itemId = item.Id;
				this.patchFromItem(item);
			}),
			takeUntil(this.destroy$)
		).subscribe();
	}

	private patchDate(year : number, month : number, day : number) : void {
		const date = new NgbDate(year, month, day);

		this.ToDoForm.reset();
		this.ToDoForm.patchValue({
			Importance : this.dftImportance,
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

	public OnSave() : void {
		this.ToDoForm.markAllAsTouched();
		
		if (this.ToDoForm.invalid) { return; }
		
		const item : ToDoItem = {
			Name : this.ToDoForm.get('Name').value,
			Description : this.ToDoForm.get('Description').value,
			Date : this.ToDoForm.get('Date').value,
			Time : this.ToDoForm.get('Time').value,
			Importance : +this.ToDoForm.get('Importance').value,
		}

		if (this.isAddMode) { this.store.dispatch(CreateTodo({ item })); }
		else 				{ this.store.dispatch(UpdateTodo({ id : this.itemId, item : item })); }
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

	public ngOnDestroy() : void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
