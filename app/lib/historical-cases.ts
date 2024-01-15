import { getData, buildApiFilters } from '@/app/lib/get-data';
import { RegionAreaName } from '@/app/types/types';
import { filterToRange } from '@/app/lib/filter-data';

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

export async function getDailyRollingCases(region: RegionAreaName) {
  const cases = await fetchDailyRollingCases(region);
  const filteredCases = filterToRange(cases, 13);
  return filteredCases;
}
