import { Metadata } from 'next';
import HeadlineFigureWrapper from '@/app/ui/headline/headline-figures';
import NewCasesLinePlot from '@/app/ui/plots/new-cases-plot-ts';
import { fetchCases, filterCases } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'London COVID-19 Cases',
};

export default async function Page({ params }: { params: { region: string } }) {
  const region = params.region;
  const newCases = await fetchCases(region);
  const filteredNewCases = filterCases(newCases);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <HeadlineFigureWrapper />
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 py-10 h-96">
        <NewCasesLinePlot newCases={filteredNewCases} />
        {/* <NewCasesLinePlot /> */}
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 py-10 h-96">
        {/* <NewCasesLinePlot /> */}
        {/* <NewCasesLinePlot /> */}
      </div>
    </div>
  );
}
