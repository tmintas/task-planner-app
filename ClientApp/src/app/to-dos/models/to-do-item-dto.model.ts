import { Importance } from '@todo-enums';

export class TodoItemDto {
	public id? : number;
	public HasTime : boolean;
	public Date : Date;
	public Name : string;
	public Description : string;
	public Importance : Importance;
}	
