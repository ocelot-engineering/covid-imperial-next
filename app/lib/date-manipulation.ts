/**
 * Returns the maximum date from an array of date strings.
 *
 * This is useful to avoid having to deal with timezones.
 * @param dateStrings - An array of date strings.
 * @returns The maximum date from the array.
 */
export function getMaxDate(dateStrings: string[]): string {
  if (dateStrings.length == 0) {
    throw new Error('dateStrings array must have at least 1 date');
  }

  let maxDate = dateStrings.reduce((max, currentDate) => {
    return currentDate > max ? currentDate : max;
  }, dateStrings[0]);

  return maxDate;
}

/**
 * Subtracts X months from the given date.
 *
 * @param dateString - The date string in ISO format.
 * @param months - The number of months to subtract.
 * @returns The resulting date string after subtracting the specified number of months.
 */
export function subMonths(dateString: string, months: number): string {
  let date = new Date(dateString);
  date.setMonth(date.getMonth() - months);
  const dateSubbed = date.toISOString().split('T')[0];

  return dateSubbed;
}
