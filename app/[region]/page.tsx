import { Metadata } from 'next';
import { RegionAreaName } from '@/app/types/types';
import {
  fetchHeadlineCases,
  fetchHeadlineDeaths,
  fetchHeadlineAdmissions,
  fetchHeadlineTesting,
} from '@/app/lib/fetch-headline-figures';
import { getDailyRollingCases } from '@/app/lib/historical-cases';
import { fetchVariants } from '@/app/lib/historical-variants';
import HeadlineFigureWrapper from '@/app/ui/headline/headline-figures';
import NewCasesLinePlot from '@/app/ui/plots/new-cases';
import VariantPlot from '@/app/ui/plots/variants';

export const metadata: Metadata = {
  title: 'London COVID-19 Dashboard',
};

export default async function Page({
  params,
}: {
  params: { region: RegionAreaName };
}) {
  const region = params.region;

  const headlineCases = await fetchHeadlineCases(region);
  const headlineDeaths = await fetchHeadlineDeaths(region);
  const headlineAdmissions = await fetchHeadlineAdmissions(region);
  const headlineTesting = await fetchHeadlineTesting(region);

  const newCasesHistory = await getDailyRollingCases(region);
  const variantsHistory = await fetchVariants(region);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <HeadlineFigureWrapper
          cases={headlineCases}
          deaths={headlineDeaths}
          admissions={headlineAdmissions}
          testing={headlineTesting}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 py-10 h-fit ">
        <NewCasesLinePlot newCases={newCasesHistory} />
        <VariantPlot variants={variantsHistory} />
      </div>
    </div>
  );
}
