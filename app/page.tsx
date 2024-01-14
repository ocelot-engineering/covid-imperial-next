import { Metadata } from 'next';
import NavDropdown from '@/app/ui/dashboard/nav-links';

export const metadata: Metadata = {
  title: 'London COVID-19 Cases',
};

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-evenly text-sm lg:flex">
        <h1 className="text-8xl font-bold drop-shadow-2xl">
          UK COVID-19 Regional Dashboard
        </h1>
        <NavDropdown />
      </div>
    </main>
  );
}
