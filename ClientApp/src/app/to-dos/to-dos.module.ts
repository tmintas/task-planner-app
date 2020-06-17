import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffect } from 'app/store/effects/todo.effects';

import * as fromTodoState from '@states/todo';
import * as fromTodoReducer from '@reducers/todo';

import { EditTodoItemComponent } from './components/edit-todo-item/edit-todo-item.component';
import { DayTodoListComponent } from './components/day-todo-list/day-todo-list.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
	declarations: [
		EditTodoItemComponent,
		DayTodoListComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature(fromTodoState.TODO_FEATURE_KEY, fromTodoReducer.todoReducer),
		EffectsModule.forFeature([TodoEffect]),
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
