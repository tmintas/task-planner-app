import { TodoEffect } from "./todo.effects";
import { Observable, of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { TodoService } from "../../to-dos/services/todo.service";
import { provideMockStore } from "@ngrx/store/testing";
import { initialTodosState, TODO_FEATURE_KEY } from "@states/todo";
import { ErrorService } from "../../core/services/error-service.service";
import { NotificationService } from "../../shared/services/notification.service";
import {
	CreateTodo,
	CreateTodoFail,
	CreateTodoSuccess,
	DeleteTodo,
	DeleteTodoFail,
	DeleteTodoSuccess,
	LoadTodosAll, LoadTodosAllFail,
	SetItems, ResetSelectedTodo,
	SubmitTodo, ToggleDone, ToggleDoneFail, ToggleDoneSuccess,
	UpdateTodo,
	UpdateTodoFail,
	UpdateTodoSuccess,
	UpdateTodosVisibility
} from "@actions/todo";
import { Todo } from "@todo-models";
import { Importance } from "@todo-enums";
import { marbles } from "rxjs-marbles/jasmine";
import { Update } from "@ngrx/entity";
import { SelectDayToView } from "@actions/calendar";
import { Store } from "@ngrx/store";
import { count } from "rxjs/internal/operators/count";
import { Actions } from "@ngrx/effects";

describe('### TodoEffects ###', () => {
	const initialState = initialTodosState;
	let actions$: Observable<any>;
	let store: any;
	let effects: TodoEffect;
	let todoServiceSpy: jasmine.SpyObj<TodoService>;
	let errorServiceSpy: jasmine.SpyObj<ErrorService>;

	beforeEach(() => {
		todoServiceSpy = jasmine.createSpyObj<TodoService>('TodoService', [
			'CreateTodo', 'GetUserTodos', 'UpdateTodo', 'DeleteTodo', 'ToggleDone', 'SetInvisibleForOverflowingItems'
		]);

		errorServiceSpy = jasmine.createSpyObj<ErrorService>('ErrorService', ['handleError']);

		TestBed.configureTestingModule({
			providers: [
				TodoEffect,
				ErrorService,
				NotificationService,
				provideMockActions(() => actions$),
				provideMockStore(),
				{ provide: TodoService, useValue: todoServiceSpy },
				{ provide: ErrorService, useValue: errorServiceSpy },
			]
		});
		
		effects = TestBed.inject(TodoEffect);
		store = TestBed.inject(Store);
	})
	
	describe('onLoadTodosAll$', () => {
		it('should call GetUserTodos from api service', marbles(m => {
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
			effects.onLoadTodosAll$.subscribe(() => {
				expect(todoServiceSpy.GetUserTodos).toHaveBeenCalledTimes(1);
			});
		}))

		it('should dispatch LoadTodosAllSuccess and UpdateTodosVisibility after successful getting items from api service', marbles(m => {
			// arrange
			const items = [
				new Todo(new Date(), 'test', false, 'dd', Importance.High),
				new Todo(new Date(), 'test2', false, 'dd', Importance.High)
			];

			const getUserTodosAction$ = m.hot('a', { a : LoadTodosAll() });
			const serviceResponse$ = m.cold(  '-b', { b : items });
			const expectedEffects$ = m.cold(  '-(cd)', { c: SetItems({ items }), d: UpdateTodosVisibility() });
			
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
	
	describe('onCreateTodoSuccess$', () => {
		it('should dispatch SelectDayToView with date payload corresponding to the created item\'s date', marbles(m => {
			// arrange
			const item = new Todo(new Date(), 'test', false, 'dd', Importance.High);
			const createTodoSuccessAction$ = m.hot('-a', { a: CreateTodoSuccess({ item }) });
			const expectedEffect$ = m.cold(	       '-a', { a: SelectDayToView({ date: item.Date }) });

			// act
			actions$ = createTodoSuccessAction$;
			
			// assert
			m.expect(effects.onCreateTodoSuccess$).toBeObservable(expectedEffect$);
		}))
	})
	
	describe('onUpdateTodo$', () => {
		it('should call Update method from service once', marbles(async m => {
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
			effects.onUpdateTodo$.subscribe(() => {
				expect(todoServiceSpy.UpdateTodo).toHaveBeenCalledTimes(1);
			});
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
			m.expect(effects.onUpdateTodo$).toBeObservable(expectedEffects$);
		}))
		
		it('should dispatch UpdateTodoFail after service returned an error', marbles(m => {
			// arrange
			const todoUpdate: Update<Todo> = {
				id: 1,
				changes: new Todo(new Date(), 'current name', false, 'dd', Importance.High) 
			};
			
			const error = new Error();
			const updateTodoAction$ = m.cold('a', { a: UpdateTodo({ item: todoUpdate }) });
			const serviceResponse$ = m.cold('--#|', {}, error);
			const expectedEffects$ = m.cold('--(a|)', { a: UpdateTodoFail({ err: error })});
			todoServiceSpy.UpdateTodo.and.returnValue(serviceResponse$);
			
			// act
			actions$ = updateTodoAction$;

			// assert
			m.expect(effects.onUpdateTodo$).toBeObservable(expectedEffects$);
		}))
	})

	describe('onUpdateTodoSuccess$', () => {
		it('should dispatch SelectDayToView with date payload corresponding to the updated item\'s date', marbles(m => {
			// arrange
			const item = new Todo(new Date(), 'test', false, 'dd', Importance.High);
			const updateTodoSuccessAction$ = m.hot('-a', { a: UpdateTodoSuccess({ item: { changes: item, id: item.id } }) });
			const expectedEffect$ = m.cold(	       '-a', { a: SelectDayToView({ date: item.Date }) });

			// act
			actions$ = updateTodoSuccessAction$;

			// assert
			m.expect(effects.onUpdateTodoSuccess$).toBeObservable(expectedEffect$);
		}))
	})

	describe('onDeleteTodo$', () => {
		it('should call Delete method from service once', marbles(m => {
			// arrange
			todoServiceSpy.DeleteTodo.and.returnValue(of());

			// act
			actions$ = m.hot('b', { b: DeleteTodo({ id: 1 }) });

			// assert
			effects.onDeleteTodo$.subscribe(() => {
				expect(todoServiceSpy.DeleteTodo).toHaveBeenCalledTimes(1);
			});
		}))

		it('should dispatch DeleteTodoSuccess, UpdateTodosVisibility and ResetSelectedTodo after successful updating the item from service', marbles(m => {
			// arrange
			const deleteTodoAction$ = m.hot('a', { a : DeleteTodo({ id: 1 }) });
			const serviceResponse$ = m.cold('-v', { v: {} });
			const expectedEffects$ = m.cold('-(aur)', { a: DeleteTodoSuccess({ id: 1 }), u: UpdateTodosVisibility(), r: ResetSelectedTodo() });
			todoServiceSpy.DeleteTodo.and.returnValue(serviceResponse$);

			// act
			actions$ = deleteTodoAction$;

			// assert
			m.expect(effects.onDeleteTodo$).toBeObservable(expectedEffects$);
		}))

		it('should dispatch DeleteTodoFail after service returned an error', marbles(m => {
			// arrange
			const error = new Error();
			const deleteTodoAction$ = m.cold('a', { a: DeleteTodo({ id: 1 }) });
			const serviceResponse$ = m.cold( '--#|', {}, error);
			const expectedEffects$ = m.cold( '--(a|)', { a: DeleteTodoFail({ err: error })});
			todoServiceSpy.DeleteTodo.and.returnValue(serviceResponse$);

			// act
			actions$ = deleteTodoAction$;

			// assert
			m.expect(effects.onDeleteTodo$).toBeObservable(expectedEffects$);
		}))
	})
	
	describe('onSubmitTodo$', () => {
		it('should dispatch CreateTodo action if no item was selected prior to editing', marbles(m => {
			// arrange
			const item = new Todo(new Date(), 'test', false, 'dd', Importance.High);

			store.setState({
				[TODO_FEATURE_KEY] : {
					...initialState,
					selectedItem: null
				}
			});

			// act
			actions$ =  m.hot('-a', { a: SubmitTodo({ item }) });
			
			// assert			
			const expectedEffects$ = m.cold( '-a', { a: CreateTodo({ item })});
			m.expect(effects.onSubmitTodo$).toBeObservable(expectedEffects$);
		}))

		it('should dispatch UpdateTodo action if an item was selected prior to editing', marbles(m => {
			// act
			const item = new Todo(new Date(), 'test', false, 'dd', Importance.High);
			item.id = 1;

			store.setState({
				[TODO_FEATURE_KEY] : {
					...initialState,
					selectedItem: item
				}
			});

			const itemUpdate = {
				...item,
				id: null,
				name: 'newName'
			};
			
			// act
			actions$ =  m.hot('-a', { a: SubmitTodo({ item: itemUpdate }) });
			
			// assert
			const expectedEffects$ = m.cold( '-a', { a: UpdateTodo({ item: { changes: itemUpdate, id: item.id } })});
			m.expect(effects.onSubmitTodo$).toBeObservable(expectedEffects$);
		}))
	})
	
	describe('onToggleDone$', () => {
		it('should dispatch ToggleDoneSuccess after successful update from the service', marbles(m => {
			// arrange
			const toggleDoneAction$ = m.cold('a', { a: ToggleDone({ id: 1 }) });
			const serviceResponse$ =  m.cold('-s', { s: null });
			const expectedEffects$ =  m.cold('-a', { a: ToggleDoneSuccess({ id: 1 }) });

			// act
			actions$ = toggleDoneAction$;
		
			// assert
			todoServiceSpy.ToggleDone.and.returnValue(serviceResponse$);
			m.expect(effects.onToggleDone$).toBeObservable(expectedEffects$)
		}));

		it('should dispatch ToggleDoneFail after successful returned an error', marbles(m => {
			// arrange
			const error = new Error();
			const toggleDoneAction$ = m.cold('a', { a: ToggleDone({ id : 1 }) });
			const serviceResponse$ =  m.cold('-#|', {}, error);
			const expectedEffects$ =  m.cold('-(a|)', { a: ToggleDoneFail({ err: error }) });
			todoServiceSpy.ToggleDone.and.returnValue(serviceResponse$);

			// act
			actions$ = toggleDoneAction$;

			// assert
			m.expect(effects.onToggleDone$).toBeObservable(expectedEffects$)
		}));

		it('should not dispatch many ToggleDoneSuccess actions when many actions are dispatched and service response takes a long time', marbles(m => {
			// arrange
			const id = 1;
			const toggleDoneAction$ = m.cold('aaa', { a: ToggleDone({ id }) });
			const serviceResponse$ =  m.cold('---s', {});
			const expectedEffects$ =  m.cold('-----r', { r: ToggleDoneSuccess({ id }) });
			todoServiceSpy.ToggleDone.and.returnValue(serviceResponse$);

			// act
			actions$ = toggleDoneAction$;

			// assert
			m.expect(effects.onToggleDone$).toBeObservable(expectedEffects$)
		}));
	})	
	
	describe('onTodoActionFail$', () => {
		it('should handle the error in service when any of the failed actions was dispatched', marbles(m => {
			// arrange
			const error = new Error();
			const failedActions$ = m.cold('abcde|', { 
				a: LoadTodosAllFail({ err: error }), 
				b: UpdateTodoFail({ err: error}),
				c: CreateTodoFail({ err: error}), 
				d: DeleteTodoFail({ err: error}),
				e: ToggleDoneFail({ err: error}),
			});
			
			// act
			actions$ = failedActions$;
		
			// assert
			effects.onTodoActionFail$.pipe(count()).subscribe((v) => {
				expect(v).toEqual(5);
			});
		}));
	})
	
	describe('onUpdateTodosVisibility$', marbles(m => {
		it('should set items with updated visibility', () => {
			// arrange
			const item = new Todo(new Date(), 'current name', false, 'dd', Importance.High);
			item.id = 1;
			const items = [ item ];

			store.setState({
				[TODO_FEATURE_KEY] : {
					...initialState,
					items: {},
					ids: [1]
				}
			});

			// act
			actions$ = m.cold('su', { s: SetItems({ items }), u: UpdateTodosVisibility() });
			
			// assert
			effects.onUpdateTodosVisibility$.subscribe(() => {
				expect(todoServiceSpy.SetInvisibleForOverflowingItems).toHaveBeenCalledTimes(1);
			});
		})
	}));
})