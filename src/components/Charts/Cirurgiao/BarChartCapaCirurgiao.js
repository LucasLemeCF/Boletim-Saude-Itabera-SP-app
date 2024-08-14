import { useState } from "react";
import { Bar } from "react-chartjs-2";

function BarChartCapaCirurgiao({ cirurgioes }) {
  const [chartData] = useState({
    type: 'bar',
    labels: montarLabels(cirurgioes),
    datasets: [
      {
        label: "Total",
        data: montarData(cirurgioes),
        borderColor: '#337B5B',
        backgroundColor: '#337B5B',
      }
    ]
  });

  return (
    <div className="chart-container mt-4 px-8">
      <Bar
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
              text: 'Total de cirurgias',
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
                padding: 10,
                font: {
                  size: 9
                }
              },
            },
            x: {
              ticks: {
                padding: 10,
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

function montarLabels(cirurgioes) {
  let labels = [];

  cirurgioes.map(cirurgiao => {
    cirurgiao.procedimentos.map(procedimento => {
      labels.push(procedimento.nome + ' - ' + cirurgiao.nome);
    });
  });

  return labels;
}

function montarData(cirurgioes) {
  let resultado = [];

  cirurgioes.map(cirurgiao => {
    cirurgiao.procedimentos.map(procedimento => {
      let soma = 0;
  
      procedimento.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
        soma += resultadosDiario.atendimentos;
      });
  
      resultado.push(soma);
    });
  });

  return resultado;
}

export default BarChartCapaCirurgiao;