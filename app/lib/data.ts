import { getMaxDate, subMonths } from '@/app/lib/dates';

export async function getData(params: any) {
  const endpoint = 'https://api.coronavirus.data.gov.uk/v1/data';
  const parsedParams = new URLSearchParams(params);

  const req = `${endpoint}?${parsedParams}`;

  const res = await fetch(req);
  const resposeBody = await res.json();

  if (!res.ok) {
    const reason = resposeBody.response;

    throw new Error(
      `Failed to fetch data.\n[${res.status}] ${res.statusText}: ${reason}`
    );
  }

  return resposeBody;
}

export async function fetchCases(region: string) {
  const areaType = 'region';
  const areaName = region;

  const filters = [`areaType=${areaType}`, `areaName=${areaName}`];
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
    filters: filters.join(';'),
    structure: JSON.stringify(structure),
    // latestBy: 'newCasesByPublishDate',
  };

  const res = await getData(apiParams);

  return res.data;
}

export function filterCases(data) {
  const dateStrings = data.map((x) => x.date);
  const maxDate = getMaxDate(dateStrings);
  const startDate = subMonths(maxDate, 13);
  const dataFiltered = data.filter((x) => x.date > startDate);

  return dataFiltered;
}
