import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';

@NgModule({
	declarations: [
		EditTodoItemComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		EditTodoItemComponent
	]
})
export class ToDosModule { }
