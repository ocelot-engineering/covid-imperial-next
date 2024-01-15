import { getMaxDate } from '@/app/lib/date-manipulation';

describe('get latest date', () => {
  it('returns the maximum date from an array of date strings', () => {
    const dateStrings = ['2022-01-01', '2022-02-15', '2022-03-10'];
    const maxDate = getMaxDate(dateStrings);
    expect(maxDate).toBe('2022-03-10');
  });

  it('can handle an array of a single date', () => {
    const dateStrings = ['2022-01-01'];
    const maxDate = getMaxDate(dateStrings);
    expect(maxDate).toBe('2022-01-01');
  });

  it('throws error if array is empty', () => {
    const dateStrings: string[] = [];
    expect(() => getMaxDate(dateStrings)).toThrow(/must have at least 1 date/i);
  });
});
