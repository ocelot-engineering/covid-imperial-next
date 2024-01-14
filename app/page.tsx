import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'London COVID-19 Cases',
};

export default async function Page() {
  return (
    <div>
      <h1>Pick a region</h1>
    </div>
  );
}
