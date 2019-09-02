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
