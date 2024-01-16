'use client';

import { PlotData, Layout, Config } from 'plotly.js';
import Plot from 'react-plotly.js';
import { CasesByVariantData } from '@/app/types/types';

export default function CasesByVariantPlot({
  variants,
}: {
  variants: CasesByVariantData;
}) {
  const data = buildTraces(variants);

  const config: Partial<Config> = {
    responsive: true,
    displayModeBar: false,
    scrollZoom: false,
  };

  const xaxis = {
    showgrid: false,
  };

  const yaxis = {
    showgrid: false,
    range: [0, 100],
  };

  const layout: Partial<Layout> = {
    title: 'Weekly Variant Distribution',
    xaxis: xaxis,
    yaxis: yaxis,
    hovermode: 'x unified',
    barmode: 'stack',
    bargap: 0,
  };

  return (
    <div className="shadow-sm bg-white p-1">
      <Plot
        className="w-full"
        data={data}
        layout={layout}
        config={config}
        useResizeHandler={true}
      />
    </div>
  );
}

function buildTraces(variants: CasesByVariantData): Partial<PlotData>[] {
  let data: Partial<PlotData>[] = [];

  for (let key of Object.keys(variants)) {
    if (isLowImpact(variants[key].newWeeklyPercentage)) {
      continue;
    }

    let trace: Partial<PlotData> = {
      x: variants[key].date,
      y: variants[key].newWeeklyPercentage,
      name: extractVariant(key),
      type: 'bar',
    };

    data.push(trace);
  }

  return data;
}

function extractVariant(rawVariantName: string): string {
  const cleanName = rawVariantName.match(/(?<=\().+(?=\))/);
  if (cleanName) {
    return cleanName[0];
  }
  return rawVariantName;
}

function isLowImpact(newWeeklyPercentage: number[]): boolean {
  const averageWeeklyPerc =
    newWeeklyPercentage.reduce((x, y) => x + y) / newWeeklyPercentage.length;

  return averageWeeklyPerc < 5;
}
