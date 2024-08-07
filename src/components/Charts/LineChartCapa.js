import { useState } from "react";
import { Line } from "react-chartjs-2";

function LineChartCapa({ especialiade }) {
  const [chartData] = useState({
    type: 'line',
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
    <div className="chart-container">
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

function montarLabels(especialiades) {
  let labels = [];

  especialiades[0].resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
    let dia = resultadosDiario.dia;
    (dia < 10) ? dia = "0" + dia : dia;

    let mes = especialiades[0].resultadosMensais[0].mes;
    (mes < 10) ? mes = "0" + mes : mes;

    const dadosDia = dia + "/" + mes;
    labels.push(dadosDia);
  });

  return labels;
}

function montarData(especialidades) {
  let resultado = [];
  
  especialidades.map(especialidade => {
    let soma = 0;

    especialidade.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
      soma += resultadosDiario.atendimentos / especialidade.resultadosMensais[0].metaMensal;
    });

    resultado.push((soma * 100).toFixed(2));
  });

  console.log(resultado);

  return resultado;
}

export default LineChartCapa;