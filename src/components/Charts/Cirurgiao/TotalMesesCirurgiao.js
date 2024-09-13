import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { numeroParaMes } from "../../../utils/meses";

function TotalMesesCirurgiao({ ano, chartRef }) {
  const [isLoading, setLoading] = useState(true);
  const { data: session } = useSession();

  const [chartData, setChartData] = useState({
    type: 'bar',
    labels: montarLabels(),
    datasets: [
      {
        label: "Total",
        data: null,
        borderColor: '#337B5B',
        backgroundColor: '#337B5B',
      }
    ]
  });

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_API + '/api/cirurgiao/resultadoAno/' + ano, {
            method: "GET",
            headers: {
              authorization: session?.user.token,
            },
          });
          const dataResponse = await response.json();
          setChartData({
            type: 'bar',
            labels: montarLabels(),
            datasets: [
              {
                label: "Total",
                data: montarData(dataResponse),
                borderColor: '#337B5B',
                backgroundColor: '#337B5B',
              }
            ]
          });
        } finally {
          setLoading(false);
        }
        
      };

      fetchData();
    }
  }, [ano]);

  if (isLoading) return Carregando()

  return (
    <div className="chart-container mt-4 px-8">
      <Bar
        ref={el => chartRef.current[1] = el}
        height='50vh'
        width='80vw'
        type='bar'
        data={chartData}
        plugins={[topNumber]}
        options={{
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Total de cirurgias por mês',
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
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;

    ctx.save();
    chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(data.datasets[0].data[index], datapoint.x, datapoint.y - 5);
    });
  }
}

function montarLabels() {
  let labels = [];

  for (let i = 1; i <= 12; i++) {
    labels.push(numeroParaMes(i));
  }

  return labels;
}

function montarData(dadosRelatorio) {
  let resultado = [];


  for (let i = 0; i < 12; i++) {
    resultado.push(dadosRelatorio[i]);
  }

  return resultado;
}

function Carregando() {
  return (
    <p>Carregando...</p>
  )
}

export default TotalMesesCirurgiao;