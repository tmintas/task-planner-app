import { Importance } from '../enums/importance.enum';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { IDeserializable } from 'app/shared/models/deserializable.model';
import { TodoItemDto } from './to-do-item-dto.model';

export class ToDoItem implements IDeserializable {
	public Id? : number;
	public Date : NgbDate;
	public Time : NgbTimeStruct;
	public Name : string;
	public Description : string;
	public Importance : Importance;

	public Visible = true;

	// mapping from DTO
	public Deserialize(dto : TodoItemDto) : this {
		this.Id = dto.id;
		this.Date = dto.date;
		this.Time = dto.time;
		this.Name = dto.name;
		this.Description = dto.description;
		this.Importance = dto.importance;

		return this;
	}
}
