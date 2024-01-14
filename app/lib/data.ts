import { getMaxDate, subMonths } from '@/app/lib/dates';
import {
  AreaType,
  RegionAreaName,
  NHSAreaName,
  ChangeDirection,
} from '@/app/lib/types';

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

export function buildApiFilters({
  areaType,
  areaName,
}: {
  areaType: AreaType;
  areaName: RegionAreaName | NHSAreaName;
}) {
  const filters = [`areaType=${areaType}`, `areaName=${areaName}`];
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

export function regionToNSHRegion(areaName: RegionAreaName): NHSAreaName {
  switch (decodeURIComponent(areaName)) {
    case 'East Midlands':
    case 'West Midlands':
      return 'Midlands';
    case 'North East':
    case 'Yorkshire and The Humber':
      return 'North East and Yorkshire';
  }

  // @ts-ignore
  return areaName;
}

export function getChangeDirection(value: number): ChangeDirection | undefined {
  if (value > 0) {
    return 'UP';
  }
  if (value === 0) {
    return 'SAME';
  }
  if (value < 0) {
    return 'DOWN';
  }

  return undefined;
}
