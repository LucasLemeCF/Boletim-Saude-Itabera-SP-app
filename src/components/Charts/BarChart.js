import { useState } from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ dadosMes }) {
  const [chartData] = useState({
    type: 'bar',
    datasets: [{
      data: montarData(dadosMes),
      backgroundColor: '#337B5B',
    }],
    labels: montarLabels(dadosMes),
  });

  return (
    <div className="chart-container flex justify-center h-full mt-4">
      <Bar
        // height="250px"
        type='bar'
        data={chartData}
        plugins={[topNumber]}
        options={{
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grace: 1,
              ticks: {
                padding: 10,
                font: {
                  size: 12
                }
              },
            },
            x: {
              ticks: {
                padding: 10,
                callback: function (value) {
                  return value + '%';
                },
              }
            }
          }
        }}
      />
    </div>
  );
}

const topNumber = {
  id: 'topNumber',
  afterDatasetsDraw(chart, args, plugins) {
    const { ctx, data } = chart;

    ctx.save();
    chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(data.datasets[0].data[index] + "%", datapoint.x + 25, datapoint.y + 5);

    });
  }
}

function montarLabels(dadosMes) {
  let labels = [];

  dadosMes.map(especialidade => {
    labels.push(especialidade.especialidade);
  });

  return labels;
}

function montarData(dadosMes) {
  let resultado = [];
  
  dadosMes.map(especialidade => {
    let soma = 0;

    especialidade.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
      soma += resultadosDiario.atendimentos / especialidade.resultadosMensais[0].metaMensal;
    });

    resultado.push((soma * 100).toFixed(2));
  });

  return resultado;
}

export default BarChart;