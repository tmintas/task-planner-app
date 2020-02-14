import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import ToDoState from '@states/todo';

import { Importance } from '@todo-enums';
import { CreateTodo, LoadImportanceOptionsSuccess, LoadImportanceOptions } from '@actions/todo';
import { ToDoItem } from '@todo-models';
import { DropdownOption } from 'app/shared/models/dropdown-option.model';
import { Observable } from 'rxjs';
import AppState from '@states/app.state';

@Component({
	selector: 'app-edit-todo-item',
	templateUrl: './edit-todo-item.component.html',
	styleUrls: ['./edit-todo-item.component.scss']
})
export class EditTodoItemComponent implements OnInit {
	private month : number;
	private day : number;

	public ImportanceOptions : Observable<DropdownOption[]>;
	public ToDoForm : FormGroup;

	constructor(private fb : FormBuilder, private route : ActivatedRoute, private store : Store<AppState>) { }

	public ngOnInit() : void {
		this.ImportanceOptions = this.store.select(s => s.todo.imprtanceOptions);

		const initialImportance = Importance.Middle;
		const initialTime : NgbTimeStruct = { hour: 12, minute: 0, second: 0 };

		// init form
		this.ToDoForm = this.fb.group({
			Date : [null, Validators.required],
			Time: [initialTime],
			Name: [null, [Validators.required, Validators.maxLength(10)]],
			Description: [null],
			Importance: [initialImportance]
		});

		// handle date changes
		this.route.params.pipe(
			map(p => {
				this.month = +p['month'];
				this.day = +p['day'];

				const initialDate : NgbDateStruct = new NgbDate(2019, this.month, this.day);
				this.ToDoForm.reset();
				this.ToDoForm.get('Date').setValue(initialDate);
				this.ToDoForm.get('Time').setValue(initialTime);
				this.ToDoForm.get('Importance').setValue(initialImportance);
			})
		).subscribe();
	}

	public OnSave() : void {
		this.ToDoForm.markAllAsTouched();
		if (this.ToDoForm.invalid) { return; }

		const item : ToDoItem = this.mapToTodo();
		this.store.dispatch(CreateTodo({ item } ));
	}

	private mapToTodo() : ToDoItem
	{
		// return {
		// 	Date : this.ToDoForm.get('Date').value as NgbDate, 
		// 	Time : this.ToDoForm.get('Time').value as NgbTimeStruct, 
		// 	Name : this.ToDoForm.get('Name').value,  
		// 	Description : this.ToDoForm.get('Description').value, 
		// 	Importance : +this.ToDoForm.get('Importance').value as Importance
		// };

		const a = new ToDoItem().Deserialize(this.ToDoForm.value);

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
