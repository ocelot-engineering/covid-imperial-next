import { getData, buildApiFilters } from '@/app/lib/data-fetching';
import { RegionAreaName, CaseHistoryItem } from '@/app/types/types';
import { filterToRange } from '@/app/lib/data-filtering';

/**
 * Fetches the daily rolling cases for a specific region.
 *
 * Specimen case dates are used for this since it's a better reflection of historical case numbers.
 * Also, published case dates can have large outliers that need further handling due to signifcant updates to numbers.
 *   See around 25th June 2023.
 * @param region - The region for which to fetch the cases.
 * @returns A promise that resolves to the fetched data.
 */
async function fetchDailyRollingCases(
  region: RegionAreaName
): Promise<CaseHistoryItem[]> {
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
 * Retrieves the historical case data for a specific region.
 *
 * This fetches the data and transforms it to be the in the right format
 * @param region The name of the region.
 * @returns A promise that resolves to an array of CaseHistoryItem objects.
 */
export async function getCasesHistory(
  region: RegionAreaName
): Promise<CaseHistoryItem[]> {
  const cases = await fetchDailyRollingCases(region);
  const filteredCases = filterToRange(cases, 13) as CaseHistoryItem[];

  return filteredCases;
}
