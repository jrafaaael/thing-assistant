export function isToday(date: Date) {
	const today = new Date();

	return (
		today.getUTCFullYear() === date.getUTCFullYear() &&
		today.getUTCMonth() === date.getUTCMonth() &&
		today.getUTCDate() === date.getUTCDate()
	);
}
