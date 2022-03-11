export function transformToCurrentTimezone(date: Date): Date {
	date = new Date(date);
	const offsetMs = date.getTimezoneOffset() * 60 * 1000;
	date.setTime(date.getTime() - offsetMs);
	
	return date;
}

const weekDays = [
	7, 1, 2, 3, 4, 5, 6
];

const monthNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export function GetDayOfWeek(date : Date) : number {
	return weekDays[ new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()).getDay() ];
}

export function GetNumberOfDaysInMonth(year : number, monthNumber : number) : number {
	return new Date(year, monthNumber, 0).getDate();
}

export function GetMonthName(index : number) : string {
	if (index < 1 || index > 12) {
		return null;
	}

	return monthNames[index - 1];
}

export function GetCurrentMonthDays(year : number, month : number) : number[] {
	const arr = [];
	const maxDayNumber = GetNumberOfDaysInMonth(year, month);

	for (let i = 1; i <= maxDayNumber; i++) {
		arr.push(i);
	}

	return arr;
}

export function GetPreviousMonthLastDates(year : number, month : number) : Date[] {
	const arr = [];
	const firstDayPosition = GetDayOfWeek( new Date(year, month, 1) );

	let lastMonthMaxDay = GetNumberOfDaysInMonth(year, month - 1);

	for (let i = 1; i < firstDayPosition; i++) {
		arr.push(new Date(year, month - 2, lastMonthMaxDay));
		lastMonthMaxDay--;
	}

	return arr.reverse();
}

export function GetNextMonthFirstDates(year : number, month : number) : Date[] {
	const arr = [];
	const nextMonthFirstDayPosition = GetDayOfWeek( new Date(year, month + 1, 1) );

	// we don't want to get the whole week of next month if it starts from Monday
	if (nextMonthFirstDayPosition === 1) { return arr; }

	for (let i = 1; i <= 8 - nextMonthFirstDayPosition; i++) {
		arr.push(new Date(year, month, i));
	}

	return arr;
}

export function GetMonthDates(year : number, month : number) : Date[] {
	const numberOfDays = (new Date(year, month , 0)).getDate()

	let arr : Date[] = [];

	for (let i = 1; i <= numberOfDays; i++) {
		arr.push(new Date(year, month - 1, i))
	}

	return arr;
}

export function areDatesEqual(date1: Date, date2: Date): boolean {
	return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

export function isDateInArray(date: Date, array: Date[]): boolean {
	return array.some(d => d.getTime() ===  date.getTime());
}

export function getUniqueDates(dates: Date[]): Date[] {
	const result = [];

	for (let date of dates) {
		if (!this.isDateInArray(date, result))
			result.push(date);
	}

	return result;
}

export function dismissTime(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}