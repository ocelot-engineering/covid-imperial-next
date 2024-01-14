'use client';

import { PlotData, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';

// interface NewCasesRecord {
//   date: string;
//   cases: number;
// }

export default function NewCasesLinePlot({ newCases }: any) {
  const traceNewCasesRollingAverage: Partial<PlotData> = {
    x: newCases.map((item: { date: string }) => item.date),
    y: newCases.map((item: { rollingCases: string }) => item.rollingCases),
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'red' },
  };

  const data = [traceNewCasesRollingAverage];

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
    title: 'New Cases 7-day Rolling Average',
    xaxis: xaxis,
    yaxis: yaxis,
    hovermode: 'x unified',
  };

  return <Plot data={data} layout={layout} config={config} />;
}
