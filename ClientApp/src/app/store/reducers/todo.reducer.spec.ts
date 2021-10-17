import { todoReducer } from '@reducers/todo';
import * as fromTodoState from '@states/todo';
import { TodosState } from '@states/todo';
import {
	ClearTodos,
	CreateTodo,
	CreateTodoFail,
	CreateTodoSuccess, DeleteTodo,
	LoadTodosAll,
	LoadTodosAllFail,
	LoadTodosAllSuccess, UpdateTodo, UpdateTodoSuccess
} from "@actions/todo";
import { Todo } from '@todo-models';
import { Importance } from "@todo-enums";
import { Update } from "@ngrx/entity";

describe('TodoReducer', () => {
	let initialState: TodosState;
	const item = new Todo (new Date(2021, 5, 5), 'test', false, 'desc', Importance.High);
	const itemId = 1;
	item.id = itemId;

	beforeEach(() => {
		initialState = fromTodoState.initialTodosState;	
	})

	describe('LoadTodosAll', () => {
		it('should set isLoading to true and set a correct loading message', () => {
			// arrange
			const action = LoadTodosAll();
			
			// act
			const state = todoReducer(initialState, action);
			
			// assert
			expect(state.isLoading).toBe(true);
			expect(state.loadingMessage).toBe('Loading your items...');
		})
	})	
	
	describe('LoadTodosAllSuccess', () => {
		it('should add passed items to state', () => {
			// arrange
			const action = LoadTodosAllSuccess({items: [item]})
			const expectedState = {
				...initialState,
				entities: {
					[item.id]: item
				},
				ids: [item.id]
			};

			// act
			const newState = todoReducer(initialState, action);

			// assert
			expect(newState).toEqual(expectedState);
		})
		it('should reset isLoading flag and loading message', () => {
			// arrange
			const action = LoadTodosAllSuccess({items: [item]})

			// act
			const newState = todoReducer(initialState, action);

			// assert
			expect(newState.isLoading).toBe(false);
			expect(newState.loadingMessage).toBe(null);
		})
	})

	describe('LoadTodosAllFail', () => {
		it('should set items to an empty array', () => {
			// arrange
			const action = LoadTodosAllFail({ err: new Error('error')});

			// act
			const newState = todoReducer(initialState, action);

			// assert
			expect(newState.entities).toEqual({});
			expect(newState.ids).toEqual([]);
		})		
		it('should reset isLoading flag and loading message', () => {
			// arrange
			const action = LoadTodosAllFail({ err: new Error('error')});

			// act
			const newState = todoReducer(initialState, action);

			// assert
			expect(newState.loadingMessage).toEqual(null);
			expect(newState.isLoading).toEqual(false);
		})
	})

	describe('CreateTodo', () => {
		it('should set isLoading flag to true and set a correct loading message', () => {
			// arrange
			const action = CreateTodo({ item });

			// act
			const newState = todoReducer(initialState, action);

			// assert
			expect(newState.loadingMessage).toEqual('Creating a new item...');
			expect(newState.isLoading).toEqual(true);
		})
	})

	describe('CreateTodoSuccess', () => {
		it('should add an item to the collection', () => {
			// arrange
			const action = CreateTodoSuccess({ item });

			// act
			const newState = todoReducer(initialState, action)

			// assert
			expect(newState).toEqual({
				...initialState,
				entities: {
					[item.id]: item
				},
				ids: [item.id]
			});
		})
		it('should reset isLoading flag and loading message', () => {
			// arrange
			const action = CreateTodoSuccess({ item });

			// act
			const newState = todoReducer(initialState, action);

			// assert
			expect(newState.isLoading).toBe(false);
			expect(newState.loadingMessage).toBe(null);
		})
	})

	describe('CreateTodoFail', () => {
		it('should reset isLoading flag and loading message', () => {
			// arrange
			const action = CreateTodoFail({ err: new Error()});

			// act
			const newState = todoReducer(initialState, action)

			// assert
			expect(newState.isLoading).toBe(false);
			expect(newState.loadingMessage).toBe(null);
		})
	})
	
	describe('UpdateTodo', () => {
		it('should set isLoading flag to true and set a correct loading message', () => {
			// arrange
			let updatedTodo = { ...item } as Todo;
			updatedTodo.Name = 'new name';

			const action = UpdateTodo({ 
				item: {
					id: updatedTodo.id,
					changes: updatedTodo
				} 
			});

			// act
			const newState = todoReducer(initialState, action)

			// assert
			expect(newState.isLoading).toBe(true);
			expect(newState.loadingMessage).toBe('Updating your item...');
		})		
		it('should set isLoading flag to true and set a correct loading message', () => {
			// arrange
			let updatedTodo = { ...item } as Todo;
			updatedTodo.Name = 'new name';

			const action = UpdateTodo({ 
				item: {
					id: updatedTodo.id,
					changes: updatedTodo
				} 
			});

			// act
			const newState = todoReducer(initialState, action)

			// assert
			expect(newState.isLoading).toBe(true);
			expect(newState.loadingMessage).toBe('Updating your item...');
		})
	})	
	
	describe('UpdateTodoSuccess', () => {
		it('should reset isLoading flag and loading message', () => {
			// arrange
			let updatedTodo = { ...item } as Todo;
			updatedTodo.Name = 'new name';

			const action = UpdateTodoSuccess({ 
				item: {
					id: updatedTodo.id,
					changes: updatedTodo
				} 
			});

			// act
			const newState = todoReducer(initialState, action)

			// assert
			expect(newState.isLoading).toBe(false);
			expect(newState.loadingMessage).toBe(null);
		})	

		it('should update the item', () => {
			// arrange
			const loadAllSuccessAction = LoadTodosAllSuccess({items: [item]})
			let state;
			
			// act
			state = todoReducer(initialState, loadAllSuccessAction); []
			
			let updatedTodo = { ...item, Name: 'new name' } as Todo;

			const action = UpdateTodoSuccess({ 
				item: {
					id: updatedTodo.id,
					changes: updatedTodo
				} as Update<Todo>
			});

			// act
			state = todoReducer(state, action)

			// assert
			expect(state.entities).toEqual({
				[itemId]: updatedTodo
			});
		})
	})
	
	describe('ClearTodos', () => {
		it('should reset the todos collection', () => {
			// arrange
			const loadTodosAction = LoadTodosAllSuccess({ items: [item] });
			let state = todoReducer(initialState, loadTodosAction);
			const clearTodosAction = ClearTodos();
			
			// act
			state = todoReducer(state, clearTodosAction);
			
			// assert
			expect(state.entities).toEqual({});
		})
	})
})