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

	public Visible = true;

	// mapping from DTO
	public Deserialize(source : TodoItemDto) : this {
		this.Name = source.name;
		this.Date = source.date;
		this.Time = source.time;
		this.Description = source.description;
		this.Importance = source.importance;
		this.Id = source.id;

		return this;
	}

	public MapToDto() : TodoItemDto {
		return {
			date : this.Date,
			time : this.Time,
			name : this.Name,
			description : this.Description,
			importance : this.Importance
		}	
	}
}
