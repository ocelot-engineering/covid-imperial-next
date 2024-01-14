import {
  FlagIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

const iconMap = {
  flag: FlagIcon,
};

interface HeadlineData {
  value: number;
  changeDirection: 'UP' | 'DOWN' | 'SAME';
  changeNum: number;
  changePerc: number;
  code?: string;
  date?: string;
  name?: string;
}

export default async function HeadlineFigureWrapper({
  cases,
  deaths,
}: {
  cases: HeadlineData;
  deaths: HeadlineData;
}) {
  return (
    <>
      <HeadlineFigureCard title="New Cases" values={cases} type="flag" />
      <HeadlineFigureCard title="Reported Deaths" values={deaths} type="flag" />
      {/* <HeadlineFigureCard title="Hospitalisations" values={123} type="flag" /> */}
      {/* <HeadlineFigureCard title="Vaccinations" values={123} type="flag" /> */}
    </>
  );
}

export function HeadlineFigureCard({
  title,
  values,
  type,
}: {
  title: string;
  values: HeadlineData;
  type: 'flag';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <div className="truncate rounded-xl bg-white px-4 py-8 text-center text-3xl">
        {values.value}
        <HeadlineChange values={values} />
      </div>
    </div>
  );
}

const changeIconMap = {
  UP: ArrowUpIcon,
  DOWN: ArrowDownIcon,
  SAME: ArrowRightIcon,
};

function HeadlineChange({ values }: { values: HeadlineData }) {
  const Icon = changeIconMap[values.changeDirection] || QuestionMarkCircleIcon;

  return (
    <div
      className={clsx({
        ['flex flex-row py-2 mx-6 mt-6 font-semibold place-content-center rounded-xl']:
          true,
        'bg-red-300 text-red-900': values.changeDirection == 'UP',
        'bg-green-300 text-green-900': values.changeDirection == 'DOWN',
        'bg-amber-300 text-amber-900':
          values.changeDirection == 'SAME' || undefined,
      })}
    >
      {<Icon className="h-5 w-5" />}
      <h3 className="ml-2 text-sm">{values.changeNum}</h3>
      <h3 className="ml-2 text-sm">{`(${values.changePerc}%)`}</h3>
    </div>
  );
}
