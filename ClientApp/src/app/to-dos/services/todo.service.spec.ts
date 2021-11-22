import { TestBed } from "@angular/core/testing";
import { MAX_VISIBLE_ITEMS_PER_DAY, TodoService } from "./todo.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Todo } from "@todo-models";
import { Importance } from "@todo-enums";

describe('### TodoService ###', () => {
	let sut: TodoService;
	const date = new Date(2020, 1, 1);
	const items = [
		new Todo(date, 'first', false, null, Importance.High),
		new Todo(date, 'second', false, null, Importance.High),
		new Todo(date, 'third', false, null, Importance.High),
		new Todo(date, 'fourth', false, null, Importance.High),
		new Todo(date, 'overflowing fifth', false, null, Importance.High),
		new Todo(date, 'overflowing sixth', false, null, Importance.High),
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			providers: []
		});

		sut = TestBed.inject(TodoService);
	});

	it('setInvisibleForOverflowingItems should set Visible flag to false ' +
		'if item has greater or equal index than {MAX_VISIBLE_ITEMS_PER_DAY} for a specific date', () => {
		// act
		const result = sut.setInvisibleForOverflowingItems(items);
		
		// assert
		expect(result[MAX_VISIBLE_ITEMS_PER_DAY].Visible).toBeFalse();
		expect(result[MAX_VISIBLE_ITEMS_PER_DAY + 1].Visible).toBeFalse();

	})		
	
	it('setInvisibleForOverflowingItems should set Visible flag to true ' +
		'if item has lower index than {MAX_VISIBLE_ITEMS_PER_DAY} for a specific date', () => {
		// act
		const result = sut.setInvisibleForOverflowingItems(items);
		
		// assert
		const itemsThatShouldBeVisible = result.filter((_, i) => i < MAX_VISIBLE_ITEMS_PER_DAY)
		expect(itemsThatShouldBeVisible.every(i => i.Visible)).toBeTrue();
	})	

	it('setInvisibleForOverflowingItems should not mutate items', () => {
		// act
		sut.setInvisibleForOverflowingItems(items);
		
		// assert
		expect(items.every(i => i.Visible === undefined)).toBe(true, 'some item\'s Visible flag was mutated');
	})
})
