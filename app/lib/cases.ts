import { getData, buildApiFilters } from '@/app/lib/data';
import { RegionAreaName } from '@/app/lib/types';

/**
 * Fetches the daily rolling cases for a specific region.
 *
 * Specimen case dates are used for this since it's a better reflection of historical case numbers.
 * Also, published case dates can have large outliers that need further handling due to signifcant updates to numbers.
 *   See around 25th June 2023.
 * @param region - The region for which to fetch the cases.
 * @returns A promise that resolves to the fetched data.
 */
export async function fetchDailyRollingCases(region: RegionAreaName) {
  const structure = {
    date: 'date',
    name: 'areaName',
    code: 'areaCode',
    rollingCases: 'newCasesBySpecimenDateRollingSum',
  };

  const apiParams = {
    filters: buildApiFilters({ areaType: 'region', areaName: region }),
    structure: JSON.stringify(structure),
  };

  const res = await getData(apiParams);

  return res.data;
}

/**
 * Fetches the headline cases for a specific region.
 * Published case dates are used for this since specimen case dates are considered incomplete for most recent days.
 * @param region The region for which to fetch the headline cases.
 * @returns A promise that resolves to the fetched headline cases data.
 */
export async function fetchHeadlineCases(region: RegionAreaName) {
  const structure = {
    date: 'date',
    name: 'areaName',
    code: 'areaCode',
    value: 'newCasesByPublishDateRollingSum', // sum of latest 7 days
    changeNum: 'newCasesByPublishDateChange', // difference between latest 7 days and previous non-overlapping 7 days
    changePerc: 'newCasesByPublishDateChangePercentage',
    changeDirection: 'newCasesByPublishDateDirection',
  };

  const apiParams = {
    filters: buildApiFilters({ areaType: 'region', areaName: region }),
    structure: JSON.stringify(structure),
    latestBy: 'newCasesByPublishDateRollingSum',
  };

  const res = await getData(apiParams);

  return res.data[0];
}
