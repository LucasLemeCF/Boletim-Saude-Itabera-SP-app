import { useState } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ especialidade }) {
  const [chartData, setChartData] = useState({
    type: 'line',
    labels: "teste", 
    datasets: [
      {
        data: [20, 10],
      }
    ]
  });

  // console.log(especialidade.resultadosMensais[0].resultadosDiarios.map(data => data.atendimentos));

  return (
    <div className="chart-container border border-black">
      <h2 style={{ textAlign: "center" }}>{especialidade.especialidade}</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        }}
      />
    </div>
  );
}

export default LineChart;