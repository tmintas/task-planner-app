import * as fromTodoReducer from '@reducers/todo';
import * as fromTodoState from '@states/todo';
import {TodosState} from '@states/todo';
import {LoadTodosAllSuccess, TodoActionTypes} from "@actions/todo";
import {Todo} from '@todo-models';
import {Importance} from "@todo-enums";

describe('TodoReducer tests', () => {
	let initialState: TodosState;
	
	beforeEach(() => {
		initialState = fromTodoState.initialTodosState;	
	})

	describe('LoadTodosAll tests', () => {
		it('should set isLoading to true', () => {
			const action = {
				type: TodoActionTypes.LOAD_TODOS_ALL
			};
				
			const state = fromTodoReducer.todoReducer(initialState, action);
			
			expect(state.isLoading).toBe(true);
		}),	
		it('should set a correct loading message', () => {
			const action = {
				type: TodoActionTypes.LOAD_TODOS_ALL
			};

			const state = fromTodoReducer.todoReducer(initialState, action);
			
			expect(state.loadingMessage).toBe('Loading your items...');
		})
	})	
	
	describe('LoadTodosAllSuccess tests', () => {
		it('should add passed items to state', () => {
			const item = new Todo (1, new Date(2021, 5, 5), 'test', false, 'desc', Importance.High);
			const action = LoadTodosAllSuccess({ items: [ item ] })
			const newState = fromTodoReducer.todoReducer(initialState, action);
			const expectedState = {
				...initialState,
				entities: {
					[item.id]: item
				},
				ids: [item.id]
			};
			
			expect(newState).toEqual(expectedState);
			expect(newState).not.toBe(expectedState);
		})
	})
})