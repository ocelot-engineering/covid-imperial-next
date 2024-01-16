'use client';

import { PlotData, Layout, Config } from 'plotly.js';
import Plot from 'react-plotly.js';
import { CaseHistoryItem } from '@/app/types/types';

export default function NewCasesPlot({
  newCases,
}: {
  newCases: CaseHistoryItem[];
}) {
  const traceNewCasesRollingAverage: Partial<PlotData> = {
    x: newCases.map((item: { date: string }) => item.date),
    y: newCases.map((item: { rollingCases: number }) => item.rollingCases),
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'red' },
  };

  const data = [traceNewCasesRollingAverage];

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
  };

  const layout: Partial<Layout> = {
    title: 'New Cases 7-day Rolling Average',
    xaxis: xaxis,
    yaxis: yaxis,
    hovermode: 'x unified',
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
