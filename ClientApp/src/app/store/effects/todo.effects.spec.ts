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
	UpdateTodo, UpdateTodoSuccess,
	UpdateTodosVisibility
} from "@actions/todo";
import { Todo } from "@todo-models";
import { Importance } from "@todo-enums";
import { marbles } from "rxjs-marbles/jasmine";
import { Update } from "@ngrx/entity";

describe('### TodoEffects ###', () => {
	const initialState = initialTodosState;
	let actions$: Observable<any>;
	let store: MockStore<TodosState>;
	let effects: TodoEffect;
	let todoServiceSpy: jasmine.SpyObj<TodoService>;

	beforeEach(() => {
		todoServiceSpy = jasmine.createSpyObj<TodoService>('TodoService', ['CreateTodo', 'GetUserTodos', 'UpdateTodo']);

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
		it('should call GetUserTodos from api service', marbles(async m => {
			// arrange
			const items = [
				new Todo(new Date(), 'test', false, 'dd', Importance.High),
				new Todo(new Date(), 'test2', false, 'dd', Importance.High)
			];
			const getUserTodosAction$ = m.cold('-a', { a : LoadTodosAll() });
			const serviceResponse$ = of(items);

			todoServiceSpy.GetUserTodos.and.returnValue(serviceResponse$);

			// act 
			actions$ = getUserTodosAction$;

			// assert
			await effects.onLoadTodosAll$.subscribe();
			expect(todoServiceSpy.GetUserTodos).toHaveBeenCalledTimes(1);
		}))

		it('should dispatch LoadTodosAllSuccess and UpdateTodosVisibility after successful getting items from api service', marbles(m => {
			// arrange
			const items = [
				new Todo(new Date(), 'test', false, 'dd', Importance.High),
				new Todo(new Date(), 'test2', false, 'dd', Importance.High)
			];

			const getUserTodosAction$ = m.hot('a', { a : LoadTodosAll() });
			const serviceResponse$ = m.cold(  '-b', { b : items });
			const expectedEffects$ = m.cold(  '-(cd)', { c: LoadTodosAllSuccess({ items }), d: UpdateTodosVisibility() });
			
			todoServiceSpy.GetUserTodos.and.returnValue(serviceResponse$);

			// act
			actions$ = getUserTodosAction$;
			
			// assert
			m.expect(effects.onLoadTodosAll$).toBeObservable(expectedEffects$);
		}))
	})
	
	describe('onCreateTodo$', () => {
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
	
	describe('onUpdateTodo$', () => {
		it('should call Update method from service', marbles(async m => {
			// arrange
			const item = new Todo(new Date(), 'current name', false, 'dd', Importance.High);
			item.id = 1;

			const todoUpdate: Update<Todo> = {
				id: item.id,
				changes: item
			};

			todoServiceSpy.UpdateTodo.and.returnValue(of(item));

			// act
			actions$ = m.hot('b', { b: UpdateTodo({ item: todoUpdate }) });
			
			// assert
			await effects.onUpdateTodo.subscribe();
			expect(todoServiceSpy.UpdateTodo).toHaveBeenCalledTimes(1);
		}))
		
		it('should dispatch UpdateTodoSuccess after successful updating the item from service', marbles(m => {
			// arrange
			const item = new Todo(new Date(), 'current name', false, 'dd', Importance.High);
			item.id = 1;

			const todoUpdate: Update<Todo> = {
				id: item.id,
				changes: item
			};

			const serviceResponse$ = m.cold('-v', { v: item });
			const updateTodoAction$ = m.hot('a', { a : UpdateTodo({ item: todoUpdate }) });
			const expectedEffects$ = m.cold('-a', { a: UpdateTodoSuccess({ item: todoUpdate }) });
			todoServiceSpy.UpdateTodo.and.returnValue(serviceResponse$);
			
			// act
			actions$ = updateTodoAction$;
			
			// assert
			m.expect(effects.onUpdateTodo).toBeObservable(expectedEffects$);
		}))
	})
})