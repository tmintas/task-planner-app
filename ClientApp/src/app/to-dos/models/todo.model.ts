import { Importance } from '../enums/importance.enum';
import { EntityBase } from '@shared-models';

export class Todo extends EntityBase {
	public Date : Date;
	public HasTime : boolean = false;
	public Name : string = null;
	public Description : string = null;
	public Importance : Importance = null;
	public IsDone : boolean = false;

	public Visible = true;

	constructor(date : Date, name : string, hasTime : boolean, description : string, importance : Importance) {
		super();
		this.Date = date;
		this.Name = name;
		this.Description = this.Description;
		this.Importance = importance;
		this.HasTime = hasTime;
	}
}
