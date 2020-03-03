import { Importance } from '../enums/importance.enum';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ItemType } from '@todo-enums';

export class ToDoItem {
    public Id : number;
    public Date : NgbDate;
    public Time : NgbTimeStruct;
	public Name : string;
	public Description : string;
    public Importance : Importance;
    public Visible : boolean = true;

    public get Type() : ItemType {
        return !this.Time 
            ? ItemType.UndefiniteTime 
            : ItemType.SingleTime;
    }

    constructor(date : NgbDate, time : NgbTimeStruct, name : string, description : string, importance : Importance, id : number = 0) {
        this.Id = id;
        this.Date = date;
        this.Time = time;
        this.Name = name;
        this.Description = description;
        this.Importance = importance;
    }
}
