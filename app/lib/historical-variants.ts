import { getData, buildApiFilters } from '@/app/lib/data-fetching';
import { filterToRange } from '@/app/lib/data-filtering';
import { RegionAreaName, CasesByVariantData } from '@/app/types/types';

interface RawCasesByVariantDataItem {
  date: string;
  variant: {
    variant: string;
    newWeeklyPercentage: number;
  }[];
}

type RawCasesByVariantData = RawCasesByVariantDataItem[];

/**
 * Retrieves the historical cases by variant data for a specific region.
 * @param region The name of the region.
 * @returns A promise that resolves to new cases by variant data.
 */
export async function getCasesByVariantHistory(
  region: RegionAreaName
): Promise<CasesByVariantData> {
  const res = (await fetchVariants(region)) as RawCasesByVariantData;
  const filteredRes = filterToRange(res, 13) as RawCasesByVariantData;
  const transformedRes = transformVariantsData(filteredRes);

  return transformedRes;
}

/**
 * Fetches new cases by variants data for a specific region.
 * @param region The name of the region.
 * @returns A Promise that resolves to variant by date.
 */
async function fetchVariants(region: RegionAreaName) {
  const structure = {
    date: 'date',
    name: 'areaName',
    code: 'areaCode',
    variant: 'variants',
  };

  const apiParams = {
    filters: buildApiFilters({ areaType: 'region', areaName: region }),
    structure: JSON.stringify(structure),
  };

  const res = await getData(apiParams);

  return res.data;
}

/**
 * Transforms the raw cases by variant data into a more structured format.
 * @param data The raw cases by variant data to be transformed.
 * @returns each variant with daily percentage of cases.
 */
function transformVariantsData(
  data: RawCasesByVariantData
): CasesByVariantData {
  let variantsTransformed: CasesByVariantData = {};

  data.forEach((dateRow) => {
    dateRow.variant.forEach((variantSetRow) => {
      // Check if key exists, if not then create one
      !variantsTransformed.hasOwnProperty(variantSetRow.variant) &&
        (variantsTransformed[variantSetRow.variant] = {
          date: [],
          newWeeklyPercentage: [],
        });

      // Append to the date and weekly perc arrays
      variantsTransformed[variantSetRow.variant].date.push(dateRow.date);
      variantsTransformed[variantSetRow.variant].newWeeklyPercentage.push(
        variantSetRow.newWeeklyPercentage
      );
    });
  });

  return variantsTransformed;
}
