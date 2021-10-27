import { TodoEffect } from "./todo.effects";
import { Observable, of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { TodoService } from "../../to-dos/services/todo.service";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { initialTodosState, TodosState } from "@states/todo";
import { ErrorService } from "../../core/services/error-service.service";
import { NotificationService } from "../../shared/services/notification.service";
import {
	CreateTodo,
	CreateTodoFail,
	CreateTodoSuccess,
	LoadTodosAll,
	LoadTodosAllSuccess,
	UpdateTodosVisibility
} from "@actions/todo";
import { Todo } from "@todo-models";
import { Importance } from "@todo-enums";
import { marbles } from "rxjs-marbles/jasmine";
import { Action } from "rxjs/internal/scheduler/Action";
import { UPDATE } from "@ngrx/store";

describe('### TodoEffects ###', () => {
	const initialState = initialTodosState;
	let actions$: Observable<any>;
	let store: MockStore<TodosState>;
	let effects: TodoEffect;

	let todoServiceSpy = jasmine.createSpyObj<TodoService>('TodoService', ['CreateTodo', 'GetUserTodos']);

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
		store = TestBed.inject(MockStore);
	})
	
	describe('onLoadTodosAll$', () => {
		it('should dispatch LoadTodosAllSuccess and UpdateTodosVisibility after successful getting items from service', marbles(m => {
			// arrange
			const items = [
				new Todo(new Date(), 'test', false, 'dd', Importance.High),
				new Todo(new Date(), 'test2', false, 'dd', Importance.High)
			];

			const getUserTodosAction$ = m.hot('a', { a : LoadTodosAll() });
			const serviceResponse$ = m.cold(   '-b', { b : items });
			const expectedEffects$ = m.cold(   '-(cd)', { c: LoadTodosAllSuccess({ items }), d: UpdateTodosVisibility() });
			
			todoServiceSpy.GetUserTodos.and.returnValue(serviceResponse$);

			// act
			actions$ = getUserTodosAction$;
			
			// assert
			m.expect(effects.onLoadTodosAll$).toBeObservable(expectedEffects$);
		}))	
		
		it('should call GetUserTodos', marbles(m => {
			// arrange
			const items = [
				new Todo(new Date(), 'test', false, 'dd', Importance.High),
				new Todo(new Date(), 'test2', false, 'dd', Importance.High)
			];
			const getUserTodosAction$ = m.cold('-a', { a : LoadTodosAll() });
			const serviceResponse$ = m.cold(   '-b', { b : items });

			todoServiceSpy.GetUserTodos.and.returnValue(serviceResponse$);

			// act 
			actions$ = getUserTodosAction$;
			
			// assert
			expect(todoServiceSpy.GetUserTodos).toHaveBeenCalledTimes(1);
		}))
	})
	
	describe('onCreateTodo', () => {
		it('should dispatch CreateTodoSuccess and UpdateTodosVisibility after service called CreateTodo and succeeded', marbles(m => {
			// arrange
			const item = new Todo(new Date(), 'test', false, 'dd', Importance.High);
			const updateVisAction = UpdateTodosVisibility();
			const createTodoSuccessAction = CreateTodoSuccess({ item });

			const createTodoAction$ = m.hot(  		  'a',               { a :  CreateTodo({ item }) });
			const createItemServiceResponse$ = m.cold('--c',     { c : item });
			const expectedEffect$ = m.cold(           '--(bc)',          { b: createTodoSuccessAction, c: updateVisAction });

			todoServiceSpy.CreateTodo.and.returnValue(createItemServiceResponse$);
			
			// act
			actions$ = createTodoAction$;

			// assert
			m.expect(effects.onCreateTodo$).toBeObservable(expectedEffect$);
		}))		
		
		it('should dispatch CreateTodoFail after service called CreateTodo and returned an error', marbles(m => {
			// arrange
			const item = new Todo(new Date(), 'test', false, 'dd', Importance.High);
			
			const SUT = CreateTodo({ item });
			const createTodoFailAction = CreateTodoFail({ err: 'some err' });

			const createTodoAction$ = m.hot(          'a|',       { a : SUT });
			const createItemServiceResponse$ = m.cold('--#   |',    {}, 'some err');
			const expectedEffect$ = m.cold(   	      '--(b|))', { b: createTodoFailAction });

			todoServiceSpy.CreateTodo.and.returnValue(createItemServiceResponse$);
				
			// act
			actions$ = createTodoAction$;

			// assert
			m.expect(effects.onCreateTodo$).toBeObservable(expectedEffect$);
		}))
	})
})