import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromTodoState from '../store/states/todo.state';
import * as fromTodoReducer from '../store/reducers/todo.reducer';

import { EditTodoItemComponent } from './components/edit-todo-item/edit-todo-item.component';

@NgModule({
	declarations: [
		EditTodoItemComponent
	],
	imports: [
		StoreModule.forFeature(fromTodoState.todoFeatureKey, fromTodoReducer.TodoReducer),
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
