import { FlagIcon } from '@heroicons/react/24/outline';
import { fetchCases } from '@/app/lib/data';

const iconMap = {
  flag: FlagIcon,
};

export default async function HeadlineFigureWrapper() {
  // const {
  //   newCases,
  //   newDeaths,
  //   newHospitalisations,
  //   newVaccinations,
  // } = await fetchCardData();

  // const newCases = await fetchCases('london');
  const newCases = { cases: 1234 };
  // console.log(newCases);

  return (
    <>
      <HeadlineFigureCard title="Cases" value={newCases.cases} type="flag" />
      {/* <HeadlineFigureCard title="Deaths" value={newCases} type="flag" /> */}
      {/* <HeadlineFigureCard title="Hospitalisations" value={123} type="flag" /> */}
      {/* <HeadlineFigureCard title="Vaccinations" value={123} type="flag" /> */}
    </>
  );
}

export function HeadlineFigureCard({
  title,
  value,
  type,
}: {
  title: string;
  value: number;
  type: 'flag';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
