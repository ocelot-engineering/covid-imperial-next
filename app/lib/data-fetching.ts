import { AreaType, RegionAreaName, NHSAreaName } from '@/app/types/types';

/**
 * Fetches data from UK COVID-19 API.
 *
 * @param params - The parameters to be included in the request URL.
 * @returns A Promise that resolves to the response body containing the retrieved data.
 * @throws An error if the request fails or returns an error status.
 */
export async function getData(params: Record<string, string>): Promise<any> {
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

/**
 * Builds API filters based on the provided area type and area name.
 *
 * @param {Object} options - The options object.
 * @param {AreaType} options.areaType - The type of the area.
 * @param {RegionAreaName | NHSAreaName} options.areaName - The name of the area.
 * @returns {string} The API filters as a string.
 */
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
