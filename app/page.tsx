import { Metadata } from 'next';
import HeadlineFigureWrapper from '@/app/ui/headline/headline-figures';
// import NewCasesLinePlot from '@/app/ui/plots/new-cases';
import { fetchCases } from '@/app/lib/cases';
import { filterToRange } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'London COVID-19 Cases',
};

export default async function Page() {
  const newCases = await fetchCases('london');
  const filteredNewCases = filterToRange(newCases, 13);

  return (
    <div>
      <h1>LONDON !!!!!!!!!!!!!</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <HeadlineFigureWrapper />
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 py-10 h-96">
        {/* <NewCasesLinePlot newCases={filteredNewCases} /> */}
        {/* <NewCasesLinePlot /> */}
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 py-10 h-96">
        {/* <NewCasesLinePlot /> */}
        {/* <NewCasesLinePlot /> */}
      </div>
    </div>
  );
}
