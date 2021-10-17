import { Importance } from '../enums/importance.enum';
import { EntityBase } from '@shared-models';

export class Todo extends EntityBase {
	public Date : Date;
	public HasTime : boolean = false;
	public Name : string = null;
	public Description : string = null;
	public ImportanceTypeId : Importance = null;
	public IsDone : boolean = false;

	public Visible = true;

	constructor(date : Date, name : string, hasTime : boolean, description : string, importance: Importance) {
		super();
		// this.id = id;
		this.Date = date;
		this.Name = name;
		this.Description = description;
		this.ImportanceTypeId = importance;
		this.HasTime = hasTime;
	}
}
