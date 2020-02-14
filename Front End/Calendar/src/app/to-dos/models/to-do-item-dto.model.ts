import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { Importance } from '@todo-enums';

export class TodoItemDto {
	public Id? : number;
	public Date : NgbDate;
	public Time : NgbTimeStruct;
	public Name : string;
	public Description : string;
	public Importance : Importance;
}
