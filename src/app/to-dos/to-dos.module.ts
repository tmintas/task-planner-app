import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		EditTodoItemComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule,
	],
	exports: [
		EditTodoItemComponent
	],
	bootstrap: [
		EditTodoItemComponent
	]
})
export class ToDosModule { }
