import { Metadata } from 'next';
import HeadlineFigureWrapper from '@/app/ui/dashboard/headline-figures';

export const metadata: Metadata = {
  title: 'London COVID-19 Cases',
};

export default function Page() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <HeadlineFigureWrapper />
    </div>
  );
}
