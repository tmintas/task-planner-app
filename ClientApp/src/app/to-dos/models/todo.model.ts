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

	constructor(id : number, date : Date, name : string) {
		super();
		this.id = id;
		this.Date = date;
		this.Name = name;
	}
}