import { Metadata } from 'next';
import NavDropdown from '@/app/ui/dashboard/nav-links';

export const metadata: Metadata = {
  title: 'UK COVID-19 Cases',
};

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-evenly text-sm lg:flex">
        <h1 className="text-4xl md:text-8xl font-bold drop-shadow-2xl mb-10">
          UK COVID-19 Regional Dashboard
        </h1>
        <div className="mb-6">
          <label htmlFor="region" className="mb-2 block text-md font-medium">
            Choose a region
          </label>
          <NavDropdown />
        </div>
      </div>
    </main>
  );
}
