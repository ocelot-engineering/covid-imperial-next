'use client';

import Plot from 'react-plotly.js';

// interface NewCasesRecord {
//   date: string;
//   cases: number;
// }

export default function NewCasesLinePlot({ newCases }: any) {
  // const traceNewCases = {
  //   x: newCases.map((item) => item.date),
  //   y: newCases.map((item) => item.cases),
  //   type: 'scatter',
  //   mode: 'lines',
  //   marker: { color: 'grey' },
  // };

  const traceNewCasesRollingAverage = {
    x: newCases.map((item) => item.date),
    y: newCases.map((item) => item.rollingCases),
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
    // title: 'Date',
    showgrid: false,
  };

  const yaxis = {
    // title: 'Cases',
    showgrid: false,
  };

  const layout = {
    title: 'New Cases 7-day Rolling Average',
    xaxis: xaxis,
    yaxis: yaxis,
    hovermode: 'x unified',
  };

  return <Plot data={data} layout={layout} config={config} />;
}
