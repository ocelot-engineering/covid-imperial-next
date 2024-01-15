import { getData, buildApiFilters } from '@/app/lib/get-data';
import { filterToRange } from '@/app/lib/filter-data';
import { RegionAreaName } from '@/app/types/types';

interface VariantDateRow {
  date: string;
  variant: VariantSetRow[];
}

interface VariantSetRow {
  variant: string;
  newWeeklyPercentage: number;
}

interface VariantDataTransformed {
  [variant: string]: {
    date: string[];
    newWeeklyPercentage: number[];
  };
}

export async function fetchVariants(region: RegionAreaName) {
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

  const filteredRes = filterToRange(res.data, 13);
  const transformedRes = transformVariantsData(filteredRes);

  return transformedRes;
}

function transformVariantsData(data: VariantDateRow[]): VariantDataTransformed {
  let variantsTransformed: VariantDataTransformed = {};

  data.forEach((dateRow: VariantDateRow) => {
    dateRow.variant.forEach((variantSetRow: VariantSetRow) => {
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
