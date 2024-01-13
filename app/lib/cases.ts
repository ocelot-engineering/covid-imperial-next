import { getData, buildApiFilters } from '@/app/lib/data';

export async function fetchCases(region: string) {
  // const areaType = 'region';
  // const areaName = region;

  // const filters = [`areaType=${areaType}`, `areaName=${areaName}`];
  const structure = {
    date: 'date',
    name: 'areaName',
    code: 'areaCode',
    cases: 'newCasesBySpecimenDate',
    rollingCases: 'newCasesBySpecimenDateRollingSum',
    // cases: 'newCasesByPublishDateRollingSum',
    // deaths: 'newDeaths28DaysByDeathDateRollingSum',
    // admissions: 'newAdmissions',
  };

  const apiParams = {
    filters: buildApiFilters(region),
    structure: JSON.stringify(structure),
    // latestBy: 'newCasesByPublishDate',
  };

  const res = await getData(apiParams);

  return res.data;
}
