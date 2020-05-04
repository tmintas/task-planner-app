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

export function GetPreviousMonthLastDays(year : number, month : number) : number[] {
	const arr = [];
	const firstDayPosition = GetDayOfWeek( new Date(year, month, 1) );

	let lastMonthMaxDay = GetNumberOfDaysInMonth(year, month - 1);

	for (let i = 1; i < firstDayPosition; i++) {
		arr.push(lastMonthMaxDay--);
	}

	return arr.reverse();
}

export function GetPreviousMonthLastDates(year : number, month : number) : string[] {
	const arr = [];
	const firstDayPosition = GetDayOfWeek( new Date(year, month, 1) );

	let lastMonthMaxDay = GetNumberOfDaysInMonth(year, month - 1);

	for (let i = 1; i < firstDayPosition; i++) {
		arr.push(new Date(year, month - 2, lastMonthMaxDay).toLocaleDateString());
		lastMonthMaxDay--;
	}
	
	return arr.reverse();
}

export function GetNextMonthFirstDates(year : number, month : number) : string[] {
	const arr = [];
	const nextMonthFirstDayPosition = GetDayOfWeek( new Date(year, month + 1, 1) );

	// we don't want to get the whole week of next month if it starts from Monday
	if (nextMonthFirstDayPosition === 1) { return arr; }

	for (let i = 1; i <= 8 - nextMonthFirstDayPosition; i++) {
		arr.push(new Date(year, month, i).toLocaleDateString());
	}

	return arr;
}

export function GetNextMonthFirstDays(year : number, month : number) : number[] {
	const arr = [];
	const nextMonthFirstDayPosition = GetDayOfWeek( new Date(year, month + 1, 1) );

	// we don't want to get the whole week of next month if it starts from Monday
	if (nextMonthFirstDayPosition === 1) { return arr; }

	for (let i = 1; i <= 8 - nextMonthFirstDayPosition; i++) {
		arr.push(i);
	}

	return arr;
}

export function GetMonthDates(year : number, month : number) : string[] {
	const numberOfDays = (new Date(year, month , 0)).getDate()
	console.log(month);
	
	let arr : string[] = [];

	for (let i = 1; i <= numberOfDays; i++) {
		arr.push(new Date(year, month - 1, i, 3).toLocaleDateString())
	}
		console.log(arr);
		
	return arr
}
