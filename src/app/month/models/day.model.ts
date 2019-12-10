export class Day {
	public Index : number;
	public IsCurrentMonth : boolean;

	constructor(index : number, isCurrentMonth : boolean) {
		this.Index = index;
		this.IsCurrentMonth = isCurrentMonth;
	}
}
