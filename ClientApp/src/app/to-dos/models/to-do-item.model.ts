import { Importance } from '../enums/importance.enum';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { TodoItemDto } from './to-do-item-dto.model';

export class ToDoItem {
	public Id? : number;
	public Date : NgbDate;
	public Time : NgbTimeStruct;
	public Name : string;
	public Description : string;
	public Importance : Importance;

	public Visible? = true;

	constructor(id : number, date? : NgbDate, time? : NgbTimeStruct, name? : string, description? : string, importance? : Importance ) {
		this.Id = id;
		this.Name = name;
		this.Date = date;
		this.Time = time;
		this.Description = description;
		this.Importance = importance;
	}

	public static GetFromDto(source : TodoItemDto) : ToDoItem {
		return new ToDoItem(
			source.id,
			source.date, 
			source.time, 
			source.name, 
			source.description, 
			source.importance
		);
	}

	// public static GetFromEditForm(formValue : { [ctrl : string] : any }) : ToDoItem {
	// 	return new ToDoItem(
	// 		formValue.Name,
	// 		formValue., 
	// 		source.time, 
	// 		source.name, 
	// 		source.description, 
	// 		source.importance
	// 	);
	// }

	public static MapToDto(source : ToDoItem) : TodoItemDto {
		return {
			date : source.Date,
			time : source.Time,
			name : source.Name,
			description : source.Description,
			importance : source.Importance
		}	
	}
}
