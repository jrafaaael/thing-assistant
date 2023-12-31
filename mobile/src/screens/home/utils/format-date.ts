import { isToday } from "@/utils/is-today";
import { isYesterday } from "@/utils/is-yesterday";
import { isDateInCurrentWeek } from "@/utils/is-date-in-current-week";

const WEEKDAYS = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

export function formatDate(date: Date) {
  if (isToday(date)) {
    return date.toLocaleString(undefined, {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  if (isDateInCurrentWeek(date)) {
    return WEEKDAYS[date.getDay()];
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
}
