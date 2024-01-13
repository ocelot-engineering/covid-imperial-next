/**
 * Returns the maximum date from an array of date strings.
 * This is useful to avoid having to deal with timezones.
 * @param {string[]} dateStrings - An array of date strings.
 * @returns {string} The maximum date from the array.
 */
export function getMaxDate(dateStrings) {
  let maxDate = dateStrings.reduce((max, currentDate) => {
    return currentDate > max ? currentDate : max;
  }, dateStrings[0]);

  return maxDate;
}

/**
 * Subtracts the specified number of months from the given date.
 *
 * @param dateString - The date string in ISO format.
 * @param months - The number of months to subtract.
 * @returns The resulting date string after subtracting the specified number of months.
 */
export function subMonths(dateString: string, months: number) {
  let date = new Date(dateString);
  date.setMonth(date.getMonth() - months);
  const dateSubbed = date.toISOString().split('T')[0];

  return dateSubbed;
}
