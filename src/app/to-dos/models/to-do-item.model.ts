import { Importance } from '../enums/importance.model';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export class ToDoItem {
    public Date : NgbDate;
    public Time : NgbTimeStruct;
	public Name : string;
	public Description : string;
    public Importance : Importance;
    
    constructor(date : NgbDate, time : NgbTimeStruct, name : string, description : string, importance : Importance) {
        this.Date = date;
        this.Time = time;
        this.Name = name;
        this.Description = description;
        this.Importance = importance;
    }
}
