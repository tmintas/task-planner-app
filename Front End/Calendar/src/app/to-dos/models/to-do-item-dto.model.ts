import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { Importance } from '@todo-enums';

export interface TodoItemDto {
	id? : number;
	date : NgbDate;
	time : NgbTimeStruct;
	name : string;
	description : string;
	importance : Importance;
}
