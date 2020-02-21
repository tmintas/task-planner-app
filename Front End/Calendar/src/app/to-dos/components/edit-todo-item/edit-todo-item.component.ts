import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, pluck, distinct, takeUntil, take, distinctUntilChanged } from 'rxjs/operators';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromTodoSelectors from '@selectors/todo';

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
	private month : number;
	private itemId : number;
	private dftImportance : Importance = Importance.Low;
	private destroy$ : Subject<boolean> = new Subject<boolean>();
	private isAddMode : boolean;

	public ToDoForm : FormGroup;

	public ImportanceOptions$ : Observable<DropdownOption[]> = this.store.select(fromTodoSelectors.selectImportanceOptions);

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
		this.isAddMode = parseInt(this.route.snapshot.paramMap.get('itemId')) === 0;

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
				this.itemId = parseInt(prm, 10);
				this.isAddMode = this.itemId === 0;

				return this.store.select(fromTodoSelectors.selectById, { id : this.itemId });
			}),
			map((item : ToDoItem) => {
				if (item) this.patchFromItem(item)
				else 	  this.patchFromUrl()
			}),
			takeUntil(this.destroy$)
		).subscribe();
	}

	private patchFromUrl() : void {
		const urlDay = parseInt(this.route.snapshot.paramMap.get('day'), 10) || 1;
		const date = new NgbDate(2019, this.month, urlDay);

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
