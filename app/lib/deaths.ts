import { getData, buildApiFilters } from '@/app/lib/data';
import { RegionAreaName } from '@/app/lib/types';

/**
 * Fetches the headline deaths for a specific region.
 * Published death dates are used for this since specimen death dates are considered incomplete for most recent days.
 * @param region The region for which to fetch the headline death.
 * @returns A promise that resolves to the fetched headline death data.
 */
export async function fetchHeadlineDeaths(region: RegionAreaName) {
  const structure = {
    date: 'date',
    name: 'areaName',
    code: 'areaCode',
    value: 'newDeaths28DaysByPublishDateRollingSum', // sum of latest 7 days
    changeNum: 'newDeaths28DaysByPublishDateChange', // difference between latest 7 days and previous non-overlapping 7 days
    changePerc: 'newDeaths28DaysByPublishDateChangePercentage',
    changeDirection: 'newDeaths28DaysByPublishDateDirection',
  };

  const apiParams = {
    filters: buildApiFilters({ areaType: 'region', areaName: region }),
    structure: JSON.stringify(structure),
    latestBy: 'newDeaths28DaysByPublishDateRollingSum',
  };

  const res = await getData(apiParams);

  return res.data[0];
}
