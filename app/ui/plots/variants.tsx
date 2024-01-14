'use client';

import { Layout } from 'plotly.js';
import Plot from 'react-plotly.js';

function extractVariant(rawVariantName: string): string {
  const cleanName = rawVariantName.match(/(?<=\().+(?=\))/);
  if (cleanName) {
    return cleanName[0];
  }
  return rawVariantName;
}

export default function VariantPlot({ variants }: any) {
  const data = buildTraces(variants);

  const config = {
    responsive: true,
    displayModeBar: false,
    scrollZoom: false,
  };

  const xaxis = {
    showgrid: false,
  };

  const yaxis = {
    showgrid: false,
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
    <Plot className="shadow-sm" data={data} layout={layout} config={config} />
  );
}

function buildTraces(variants: any) {
  let data: { x: string; y: number; name: string }[] = [];

  for (let key of Object.keys(variants)) {
    if (isLowImpact(variants[key].newWeeklyPercentage)) {
      console.log(
        `${extractVariant(
          key
        )} is low impact and will not be shown on the plot.`
      );
      continue;
    }

    let trace = {
      x: variants[key].date,
      y: variants[key].newWeeklyPercentage,
      name: extractVariant(key),
      type: 'bar',
    };

    data.push(trace);
  }

  return data;
}

function isLowImpact(newWeeklyPercentage: number[]): boolean {
  const averageWeeklyPerc =
    newWeeklyPercentage.reduce((x, y) => x + y) / newWeeklyPercentage.length;

  return averageWeeklyPerc < 0.05;
}
