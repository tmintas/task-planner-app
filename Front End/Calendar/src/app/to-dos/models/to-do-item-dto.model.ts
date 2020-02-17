import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { Importance } from '@todo-enums';

export class TodoItemDto {
	public id? : number;
	public date : NgbDate;
	public time : NgbTimeStruct;
	public name : string;
	public description : string;
	public importance : Importance;
}
