import { useState } from "react";
import { Bar } from "react-chartjs-2";

function BarChartCapaEspecialidade({ especialiade, chartRef }) {
  const [chartData] = useState({
    type: 'bar',
    labels: montarLabels(especialiade),
    datasets: [
      {
        label: "Total",
        data: montarData(especialiade),
        borderColor: '#337B5B',
        backgroundColor: '#337B5B',
      }
    ]
  });

  return (
    <div className="chart-container mt-4 px-8">
      <Bar
        ref={el => chartRef.current[0] = el}
        height='50vh'
        width='80vw'
        type='bar'
        data={chartData}
        plugins={[topNumber]}
        options={{
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Total de atendimentos',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grace: 1,
              ticks: {
                padding: 0,
                font: {
                  size: 12
                }
              },
            },
            x: {
              ticks: {
                padding: 0,
                font: {
                  size: 12
                },
                callback: function (value) {
                  return value;
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
      ctx.fillText(data.datasets[0].data[index], datapoint.x + 25, datapoint.y + 5);

    });
  }
}

function montarLabels(especialidades) {
  let labels = [];

  especialidades.map(especialidade => {
    labels.push(especialidade.especialidade);
  });

  return labels;
}

function montarData(especialidades) {
  let resultado = [];
  
  especialidades.map(especialidade => {
    let soma = 0;

    especialidade.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
      soma += resultadosDiario.atendimentos;
    });

    resultado.push(soma);
  });

  return resultado;
}

export default BarChartCapaEspecialidade;