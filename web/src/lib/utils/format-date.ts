import { isToday } from './is-today';
import { isYesterday } from './is-yesterday';
import { isDateInCurrentWeek } from './is-date-in-current-week';
import { isDateInCurrentYear } from './is-date-in-current-year';

const WEEKDAYS = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

export function formatDate(date: Date) {
	if (isToday(date)) {
		return date.toLocaleString(undefined, {
			hour12: true,
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	if (isYesterday(date)) {
		return 'Yesterday';
	}

	if (isDateInCurrentWeek(date)) {
		return WEEKDAYS[date.getDay()];
	}

	if (isDateInCurrentYear(date)) {
		return date.toLocaleString(undefined, {
			day: '2-digit',
			month: 'short'
		});
	}

	return date.toLocaleString(undefined, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
}
