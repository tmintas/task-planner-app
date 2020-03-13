import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Importance } from '../enums/importance.enum';
import { TodoItemDto } from './to-do-item-dto.model';

export class Todo {
	public id? : number;
	public Date : NgbDate;
	public Time : NgbTimeStruct;
	public Name : string;
	public Description : string;
	public Importance : Importance;

	public Visible? = true;

	public static GetFromDto(source : TodoItemDto) : Todo {
		return {
			id : source.id,
			Date : source.date, 
			Time : source.time, 
			Name : source.name, 
			Description : source.description, 
			Importance : source.importance,
			Visible : true
		}
	}

	public static MapToDto(source : { [key : string] : any }) : TodoItemDto {
		return {
			date : source.Date,
			time : source.Time,
			name : source.Name,
			description : source.Description,
			importance : source.Importance
		}	
	}
}