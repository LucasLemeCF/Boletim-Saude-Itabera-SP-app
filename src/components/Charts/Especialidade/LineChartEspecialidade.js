import { useState } from "react";
import { Line } from "react-chartjs-2";

function LineChartEspecialidade({ dadosMes }) {
  const [chartData] = useState({
    type: 'line',
    labels: montarLabels(dadosMes),

    datasets: [
      {
        data: montarData(dadosMes),
        borderColor: '#337B5B',
        backgroundColor: '#337B5B',
      }
    ]
  });

  return (
    <div className="chart-container mt-4">
      <Line
        data={chartData}
        options={{
          responsive: true,
          point: {
            hoverRadius: 10
          },
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              ticks: {
                padding: 10,
                callback: function (value) {
                  return value + '%';
                },
              }
            },
            x: {
              ticks: {
                padding: 10,
              }
            }
          }
        }}
      />
    </div>
  );
}

function montarLabels(dadosMes) {
  let labels = [];

  dadosMes.resultadosDiarios.map(resultadosDiario => {
    let dia = resultadosDiario.dia;
    (dia < 10) ? dia = "0" + dia : dia;

    let mes = dadosMes.mes;
    (mes < 10) ? mes = "0" + mes : mes;

    const dadosDia = dia + "/" + mes;
    labels.push(dadosDia);
  });

  return labels;
}

function montarData(dadosMes) {
  let data = [];
  let soma = 0;

  dadosMes.resultadosDiarios.map(resultadosDiario => {
    soma += resultadosDiario.atendimentos / dadosMes.metaMensal;
    const somaFormat = (soma * 100).toFixed(2);
    data.push(somaFormat);
  });

  return data;
}

export default LineChartEspecialidade;