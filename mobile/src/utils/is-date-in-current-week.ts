export function isDateInCurrentWeek(date: Date) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getUTCDate() - today.getUTCDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getUTCDate() + 6);

  return date >= startOfWeek && date <= endOfWeek;
}
