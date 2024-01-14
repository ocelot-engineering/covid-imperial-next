import { getData, buildApiFilters, regionToNSHRegion } from '@/app/lib/data';
import { RegionAreaName } from '@/app/lib/types';

export async function fetchHeadlineAdmissions(region: RegionAreaName) {
  const structure = {
    date: 'date',
    name: 'areaName',
    code: 'areaCode',
    value: 'newAdmissionsRollingSum', // sum of latest 7 days
    changeNum: 'newAdmissionsChange', // difference between latest 7 days and previous non-overlapping 7 days
    changePerc: 'newAdmissionsChangePercentage',
    changeDirection: 'newAdmissionsDirection',
  };

  const nhsRegion = regionToNSHRegion(region);

  const apiParams = {
    filters: buildApiFilters({ areaType: 'nhsRegion', areaName: nhsRegion }),
    structure: JSON.stringify(structure),
    latestBy: 'newAdmissionsRollingSum',
  };

  const res = await getData(apiParams);

  return res.data[0];
}
