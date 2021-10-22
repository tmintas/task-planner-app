import { TodoEffect } from "./todo.effects";
import { Observable, of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { TodoService } from "../../to-dos/services/todo.service";
import { provideMockStore } from "@ngrx/store/testing";
import { initialTodosState } from "@states/todo";
import { ErrorService } from "../../core/services/error-service.service";
import { NotificationService } from "../../shared/services/notification.service";
import { CreateTodo } from "@actions/todo";
import { Todo } from "@todo-models";
import { Importance } from "@todo-enums";

fdescribe('TodoEffects', () => {
	const initialState = initialTodosState;
	let actions$ = new Observable<Action>();
	let effects: TodoEffect;

	let todoServiceSpy = jasmine.createSpyObj<TodoService>('TodoService', ['CreateTodo', 'GetUserTodos']);
	// let errorService = jasmine.createSpyObj<ErrorService>[];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TodoEffect,
				ErrorService,
				NotificationService,
				provideMockActions(() => actions$),
				provideMockStore({ initialState }),
				{ provide: TodoService, useValue: todoServiceSpy }
			]
		});
		
		effects = TestBed.inject(TodoEffect);
	})
	
	it('test', () => {
		console.log('start')
		const action = CreateTodo({ item: new Todo(new Date(), 'test', false, 'dd', Importance.High)});
		actions$ = of(action);
		effects.onCreateTodoStart.subscribe(() => {
			console.log('subscrive')
			expect(todoServiceSpy.CreateTodo).toHaveBeenCalled();
		})
	})
})