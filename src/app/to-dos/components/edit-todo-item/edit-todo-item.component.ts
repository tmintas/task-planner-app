import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { Importance } from '../../enums/importance.model';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromTodoState from '../../../store/state/todo.state';
import { AddTodo } from 'app/store/actions/todo.actions';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Component({
	selector: 'app-edit-todo-item',
	templateUrl: './edit-todo-item.component.html',
	styleUrls: ['./edit-todo-item.component.scss']
})
export class EditTodoItemComponent implements OnInit {
	private month : number;
	private day : number;

	public ImportanceOptions = Importance;
	public ImportanceKeys = Object.keys(this.ImportanceOptions).filter(key => !isNaN(Number(key)));

	public ToDoForm : FormGroup;

	constructor(private fb : FormBuilder, private route : ActivatedRoute, private store : Store<fromTodoState.ToDoState>) { }

	public ngOnInit() : void {

		
		const initialImportance = Importance.Middle;
		const initialTime : NgbTimeStruct = { hour: 12, minute: 0, second: 0 };

		// init form
		this.ToDoForm = this.fb.group({
			Date : [null, Validators.required],
			Time: [initialTime],
			Name: [null, Validators.required],
			Description: [null],
			Importance: [initialImportance]
		});

		// handle date changes
		this.route.params.pipe(
			map(p => {
				this.month = +p['monthNumber'];
				this.day = +p['dayNumber'];

				const initialDate : NgbDateStruct = new NgbDate(2019, this.month, this.day);
				this.ToDoForm.get('Date').setValue(initialDate);
			})
		).subscribe();
	}

	public OnSave() : void {
		const ngbDateValue = this.ToDoForm.get('Date').value as NgbDate;
		const ngbTimeValue = this.ToDoForm.get('Date').value as NgbTime;
		const date = new Date(ngbDateValue.year, ngbDateValue.month, ngbDateValue.day, ngbTimeValue.hour, ngbTimeValue.minute, ngbTimeValue.second);

		this.store.dispatch(AddTodo(new ToDoItem(
			date, 
			this.ToDoForm.get('Name').value, 
			this.ToDoForm.get('Description').value, 
			this.ToDoForm.get('Importance').value))
		)
	}
}
