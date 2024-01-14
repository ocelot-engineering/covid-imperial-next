import { Metadata } from 'next';
import HeadlineFigureWrapper from '@/app/ui/headline/headline-figures';
import NewCasesLinePlot from '@/app/ui/plots/new-cases';
import VariantPlot from '@/app/ui/plots/variants';
import { fetchDailyRollingCases, fetchHeadlineCases } from '@/app/lib/cases';
import { fetchHeadlineDeaths } from '@/app/lib/deaths';
import { fetchVariants } from '@/app/lib/variants';
import { filterToRange } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'London COVID-19 Cases',
};

export default async function Page({ params }: { params: { region: string } }) {
  const region = params.region;
  const newCases = await fetchDailyRollingCases(region);
  const filteredNewCases = filterToRange(newCases, 13);

  const variants = await fetchVariants(region);

  const headlineCases = await fetchHeadlineCases(region);
  const headlineDeaths = await fetchHeadlineDeaths(region);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <HeadlineFigureWrapper cases={headlineCases} deaths={headlineDeaths} />
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 py-10 h-fit ">
        <NewCasesLinePlot newCases={filteredNewCases} />
        <VariantPlot variants={variants} />
      </div>
    </div>
  );
}
