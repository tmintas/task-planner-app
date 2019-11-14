import { Importance } from '../enums/importance.model';

export class ToDoItem {
	public Date : Date;
	public Name : string;
	public Description : string;
    public Importance : Importance;
    
    constructor(date : Date, name : string, description : string, importance : Importance) {
        this.Date = date;
        this.Name = name;
        this.Description = description;
        this.Importance = importance;
    }
}
