import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

import { Importance } from 'app/to-dos/enums/importance.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export const todoFeatureKey = 'todo';

export default class ToDoState {
	items : ToDoItem[]
}

export const initialState : ToDoState = {
	items : [
		new ToDoItem(new NgbDate(2019,5,5), {hour: 12, minute: 0, second: 1}, "namete", "destest", Importance.High) ,
		new ToDoItem(new NgbDate(2019,11,10), {hour: 13, minute: 30, second:1}, "namete", "destest", Importance.High),
		new ToDoItem(new NgbDate(2019,10,10), {hour: 13, minute: 30, second:1}, "tests", "destest", Importance.Low),
		new ToDoItem(new NgbDate(2019,10,10), {hour: 13, minute: 30, second:1}, "namasdfasdete", "destest", Importance.Middle) 
	]
}

export const initializeState = () => {
	return initialState;
}
