import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgbDate, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromTodoSelectors from '@selectors/todo';

import { Importance } from '@todo-enums';
import { Todo } from '@todo-models';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Observable, Subject, combineLatest } from 'rxjs';
import AppState from '@states/app';
import { selectedDate, selectedTodo } from '@selectors/calendar';
import { SubmitTodo } from '@actions/todo';

@Component({
	selector: 'app-edit-todo-item',
	templateUrl: './edit-todo-item.component.html',
	styleUrls: ['./edit-todo-item.component.scss']
})
export class EditTodoItemComponent implements OnInit, OnDestroy {
	private dftImportance : Importance = Importance.Low;
	private destroy$ : Subject<boolean> = new Subject<boolean>();

	public ToDoForm : FormGroup;
	public get Controls() : { [ key : string ] : AbstractControl } { return this.ToDoForm.controls }

	public ImportanceOptions$ : Observable<DropdownOption[]> = this.store.select(fromTodoSelectors.selectImportanceOptions);

	constructor(private fb : FormBuilder, private store : Store<AppState>) {
		this.ToDoForm = this.fb.group({
			Date : [null, Validators.required],
			Time: [null],
			Name: [null, [Validators.required, Validators.maxLength(40)]],
			Description: [Validators.maxLength(100)],
			Importance: [null]
		});
	}

	public ngOnInit() : void {
		combineLatest(
			this.store.select(selectedTodo),
			this.store.select(selectedDate),
			(item : Todo, date : Date) => {
				if (item) {
					this.patchFromItem(item);
				} else if (date) {
					this.patchDate(date);
				}
			}
		).subscribe();
	}

	private patchDate(date : Date) : void {
		const ngDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

		this.ToDoForm.reset();
		this.ToDoForm.patchValue({
			Importance : this.dftImportance,
			Date : ngDate
		});
	}

	private patchFromItem(item : Todo) : void {
		const date = new NgbDate(item.Date.getFullYear(), item.Date.getMonth() + 1, item.Date.getDate());
		const time = { hour : item.Date.getHours(), minute : item.Date.getMinutes() };

		this.ToDoForm.patchValue({
			Date : date,
			Time: time,
			Name: item.Name,
			Description: item.Description,
			Importance: item.ImportanceTypeId
		});
	}

	public OnSave() : void {
		this.ToDoForm.markAllAsTouched();
		
		if (this.ToDoForm.invalid) { return; }
		
		const ngbDate : NgbDateStruct = this.ToDoForm.get('Date').value;
		const ngbTime : NgbTimeStruct = this.ToDoForm.get('Time').value;
		const hour = ngbTime == null ? 0 : ngbTime.hour;
		const minute = ngbTime == null ? 0 : ngbTime.minute;

		const date : Date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day, hour, minute);
		
		const item : Todo = new Todo(
			date,
			this.ToDoForm.get('Name').value,
			ngbTime != null,
			this.ToDoForm.get('Description').value,
			+this.ToDoForm.get('Importance').value
		);

		this.store.dispatch(SubmitTodo({ item }));
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
