export function isDateInCurrentYear(date: Date) {
	const today = new Date();

	return today.getFullYear() === date.getFullYear();
}
