import { Importance } from '../enums/importance.enum';
import { EntityBase } from '@shared-models';

export class Todo extends EntityBase {
	public Date : Date;
	public Name : string;
	public Description : string;
	public Importance : Importance;

	public Visible? = true;
}