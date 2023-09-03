export function isYesterday(date: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getUTCDate() === yesterday.getUTCDate() &&
    date.getUTCMonth() === yesterday.getUTCMonth() &&
    date.getUTCFullYear() === yesterday.getUTCFullYear()
  );
}
