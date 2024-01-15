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

export async function getCasesByVariantHistory(
  region: RegionAreaName
): Promise<CasesByVariantData> {
  const res = (await fetchVariants(region)) as RawCasesByVariantData;
  const filteredRes = filterToRange(res, 13) as RawCasesByVariantData;
  const transformedRes = transformVariantsData(filteredRes);

  return transformedRes;
}

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
