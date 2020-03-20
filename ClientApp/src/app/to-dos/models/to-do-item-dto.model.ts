import { Importance } from '@todo-enums';

export class TodoItemDto {
	public id? : number;
	public Date : Date;
	public Name : string;
	public Description : string;
	public Importance : Importance;
}	
