import {
  FlagIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { ChangeDirection } from '@/app/lib/types';

const iconMap = {
  flag: FlagIcon,
};

interface HeadlineData {
  value: number;
  changeDirection: ChangeDirection;
  changeNum: number;
  changePerc: number;
  code?: string;
  date?: string;
  name?: string;
  doNotColor?: boolean;
}

export default async function HeadlineFigureWrapper({
  cases,
  deaths,
  admissions,
  testing,
}: {
  cases: HeadlineData;
  deaths: HeadlineData;
  admissions: HeadlineData;
  testing: HeadlineData;
}) {
  return (
    <>
      <HeadlineFigureCard
        title="Cases"
        subtitle="Reported this week"
        values={cases}
        type="flag"
      />
      <HeadlineFigureCard
        title="Deaths"
        subtitle="Reported this week"
        values={deaths}
        type="flag"
      />
      <HeadlineFigureCard
        title="Heathcare"
        subtitle="New hospital admissions"
        values={admissions}
        type="flag"
      />
      <HeadlineFigureCard
        title="Testing"
        subtitle="Virus tests conducted"
        values={testing}
        type="flag"
      />
    </>
  );
}

function HeadlineFigureCard({
  title,
  subtitle,
  values,
  type,
}: {
  title: string;
  subtitle?: string;
  values: HeadlineData;
  type: 'flag';
}) {
  const Icon = iconMap[type];

  return (
    <div className="bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <div className="truncate bg-white px-4 py-6 text-center text-3xl">
        {values.value}
        <div className="text-sm mt-1">{subtitle}</div>
        <HeadlineChange values={values} />
      </div>
    </div>
  );
}

const changeIconMap = {
  UP: ArrowUpIcon,
  DOWN: ArrowDownIcon,
  SAME: ArrowRightIcon,
  NONE: QuestionMarkCircleIcon,
};

function HeadlineChange({ values }: { values: HeadlineData }) {
  const Icon = changeIconMap[values.changeDirection] || QuestionMarkCircleIcon;

  // force grey when colouring is not appropriate
  if (values.doNotColor) {
    values.changeDirection = 'NONE';
  }

  return (
    <div
      className={clsx({
        ['flex flex-row py-2 mx-6 mt-6 font-semibold place-content-center rounded-xl']:
          true,
        'bg-red-300 text-red-900': values.changeDirection == 'UP',
        'bg-green-300 text-green-900': values.changeDirection == 'DOWN',
        'bg-amber-300 text-amber-900': values.changeDirection == 'SAME',
        'bg-gray-200 text-gray-700': values.changeDirection == 'NONE',
      })}
    >
      {<Icon className="h-5 w-5" />}
      <h3 className="ml-2 text-sm">{values.changeNum}</h3>
      <h3 className="ml-2 text-sm">{`(${values.changePerc}%)`}</h3>
    </div>
  );
}
