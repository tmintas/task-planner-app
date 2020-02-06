import { Importance } from '../enums/importance.enum';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export interface ToDoItem {
	Id? : number;
	Date : NgbDate;
	Time : NgbTimeStruct;
	Name : string;
	Description : string;
	Importance : Importance;
}
