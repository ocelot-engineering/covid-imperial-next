import { getData, buildApiFilters, getChangeDirection } from '@/app/lib/data';
import { RegionAreaName } from '@/app/lib/types';

export async function fetchHeadlineTesting(region: RegionAreaName) {
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
