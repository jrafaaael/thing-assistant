export function isYesterday(date: Date) {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	return (
		date.getDate() === yesterday.getDate() &&
		date.getMonth() === yesterday.getMonth() &&
		date.getFullYear() === yesterday.getFullYear()
	);
}
