import { getMaxDate, subMonths } from '@/app/lib/dates';

// interface apiParameters {
//   filters: string;
//   structure: string;
//   latestBy?: string;
// }

export async function getData(params: Record<string, string>) {
  const endpoint = 'https://api.coronavirus.data.gov.uk/v1/data';
  const parsedParams = new URLSearchParams(params);

  const req = `${endpoint}?${parsedParams}`;

  const res = await fetch(req);
  const resposeBody = await res.json();

  if (!res.ok) {
    const reason = resposeBody.response;

    throw new Error(
      `Failed to fetch data.\n[${res.status}] ${res.statusText}: ${reason}\n${req}`
    );
  }

  return resposeBody;
}

export function buildApiFilters(region: string) {
  const isOverview = /^united.*?kingdom$/i.test(region);

  const areaType = isOverview ? 'overview' : 'region';
  const areaName = isOverview ? null : region;

  const filters = [`areaType=${areaType}`, areaName && `areaName=${areaName}`];

  return filters.join(';');
}

export function filterToRange(
  data: { date: string }[],
  months: number
): { date: string }[] {
  const dateStrings = data.map((x) => x.date);
  const maxDate = getMaxDate(dateStrings);
  const startDate = subMonths(maxDate, months);
  const dataFiltered = data.filter((x) => x.date > startDate);

  return dataFiltered;
}
