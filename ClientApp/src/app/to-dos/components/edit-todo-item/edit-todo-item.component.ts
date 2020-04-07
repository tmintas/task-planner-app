import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { takeUntil, switchMapTo } from 'rxjs/operators';
import { NgbDate, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import * as fromTodoSelectors from '@selectors/todo';
import * as fromRouterSelectors from '@selectors/router';

import { Importance } from '@todo-enums';
import { Todo } from '@todo-models';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Observable, Subject } from 'rxjs';
import AppState from '@states/app';
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
		this.store.pipe(
			select(fromTodoSelectors.getSelectedTodo),
			switchMapTo(
				this.store.pipe(select(fromRouterSelectors.getDateParams)),
				(selectedItem, date) => {
					if (selectedItem) {
						this.patchFromItem(selectedItem);
					} else {
						this.patchDate(date.year, date.month, date.day)
					}
				}
			),
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

	private patchFromItem(item : Todo) : void {
		const date = new NgbDate(item.Date.getFullYear(), item.Date.getMonth() + 1, item.Date.getDate());
		const time = { hour : item.Date.getHours(), minute : item.Date.getMinutes() };

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
		
		const ngbDate : NgbDateStruct = this.ToDoForm.get('Date').value;
		const ngbTime : NgbTimeStruct = this.ToDoForm.get('Time').value;
		const hour = ngbTime == null ? 0 : ngbTime.hour;
		const minute = ngbTime == null ? 0 : ngbTime.minute;

		const date : Date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day, hour, minute);
		
		const item : Todo = {
			Name : this.ToDoForm.get('Name').value,
			HasTime : ngbTime != null,
			Description : this.ToDoForm.get('Description').value,
			Date : date,
			Importance : +this.ToDoForm.get('Importance').value,
		}

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
