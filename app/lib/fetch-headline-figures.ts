import { getData, buildApiFilters } from '@/app/lib/get-data';
import { regionToNHSRegion, getChangeDirection } from '@/app/lib/clean-data';
import { HeadlineData, RegionAreaName } from '@/app/types/types';

/**
 * Fetches the headline cases for a specific region.
 * Published case dates are used for this since specimen case dates are considered incomplete for most recent days.
 * @param region The region for which to fetch the headline cases.
 * @returns A promise that resolves to the fetched headline cases data.
 */
export async function fetchHeadlineCases(
  region: RegionAreaName
): Promise<HeadlineData> {
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

/**
 * Fetches the headline deaths for a specific region.
 * Published death dates are used for this since specimen death dates are considered incomplete for most recent days.
 * @param region The region for which to fetch the headline death.
 * @returns A promise that resolves to the fetched headline death data.
 */
export async function fetchHeadlineDeaths(
  region: RegionAreaName
): Promise<HeadlineData> {
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

export async function fetchHeadlineAdmissions(
  region: RegionAreaName
): Promise<HeadlineData> {
  const structure = {
    date: 'date',
    name: 'areaName',
    code: 'areaCode',
    value: 'newAdmissionsRollingSum', // sum of latest 7 days
    changeNum: 'newAdmissionsChange', // difference between latest 7 days and previous non-overlapping 7 days
    changePerc: 'newAdmissionsChangePercentage',
    changeDirection: 'newAdmissionsDirection',
  };

  const nhsRegion = regionToNHSRegion(region);

  const apiParams = {
    filters: buildApiFilters({ areaType: 'nhsRegion', areaName: nhsRegion }),
    structure: JSON.stringify(structure),
    latestBy: 'newAdmissionsRollingSum',
  };

  const res = await getData(apiParams);

  return res.data[0];
}

export async function fetchHeadlineTesting(
  region: RegionAreaName
): Promise<HeadlineData> {
  const structure = {
    date: 'date',
    name: 'areaName',
    code: 'areaCode',
    value: 'newVirusTestsByPublishDateRollingSum', // sum of latest 7 days
    changeNum: 'newVirusTestsByPublishDateChange', // difference between latest 7 days and previous non-overlapping 7 days
    changePerc: 'newVirusTestsByPublishDateChangePercentage',
    // changeDirection: 'newVirusTestsByPublishDateDirection', // API Not working for this, patch below
  };

  const apiParams = {
    filters: buildApiFilters({ areaType: 'region', areaName: region }),
    structure: JSON.stringify(structure),
    latestBy: 'newVirusTestsByPublishDateRollingSum',
  };

  const res = await getData(apiParams);

  // Add change direction value while API is not working.
  let results = res.data[0];
  results.changeDirection = getChangeDirection(results.changeNum);
  results.doNotColor = true;

  return results;
}
