import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTodoItemComponent } from './components/edit-todo-item/edit-todo-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromTodo from '../store/reducers/todo.reducer';

@NgModule({
	declarations: [
		EditTodoItemComponent
	],
	imports: [
		StoreModule.forFeature(fromTodo.todoFeatureKey, fromTodo.TodoReducer),
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
