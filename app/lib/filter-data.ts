import { getMaxDate, subMonths } from '@/app/lib/date-manipulation';

/**
 * Filters an array of objects with a 'date' string parameter to a range of the latest date and X months back,
 * @param data - array of data objects to be filtered.
 * @param months - number of months to include in the range.
 * @returns data filtered to range.
 */
export function filterToRange(
  data: { date: string }[],
  months: number
): { date: string }[] {
  const dateStrings = data.map((x) => x.date);
  const maxDate = getMaxDate(dateStrings);
  const startDate = subMonths(maxDate, months);
  const dataFiltered = data.filter((x) => x.date > startDate);

  return dataFiltered;
}
