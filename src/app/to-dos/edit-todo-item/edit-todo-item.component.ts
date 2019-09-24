import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Importance } from '../models/importance.model';
import { ImportanceType } from '../enums/importance-type.enum';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-edit-todo-item',
	templateUrl: './edit-todo-item.component.html',
	styleUrls: ['./edit-todo-item.component.scss']
})
export class EditTodoItemComponent implements OnInit {
	public model : any;
	public ImportanceOptions : Importance[] = [
		{ Id : 1, Name : ImportanceType.Low },
		{ Id : 2, Name : ImportanceType.Middle },
		{ Id : 3, Name : ImportanceType.High }
	];

	public ToDoForm : FormGroup;

	constructor(private fb : FormBuilder) { }

	public ngOnInit() : void {
		this.ToDoForm = this.fb.group({
			Date : [''],
			Time: [''],
			Name: [''],
			Description: [''],
			Importance: [2]
		});

		console.log(this.ToDoForm.controls);

		this.ToDoForm.get('Time').valueChanges.pipe(
			map(v => {
				console.log(v);
			})
		).subscribe();
	}

}
