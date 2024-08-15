import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LineChartEspecialidade from "../../../components/Charts/Especialidade/LineChartEspecialidade";

Chart.register(CategoryScale);

export function CorpoEspecialidade({especialidade, chartRef, base64Image}) {  
  const dadosMes = especialidade.resultadosMensais[0];

  return (
    <div className={`flex flex-col justify-items-start border-b border-black w-[891px] h-[630px] p-8`}> 
      {titulo(especialidade)}
      {descricao(dadosMes)}
      <LineChartEspecialidade dadosMes={dadosMes}/>
    </div>
  );
}

const titulo = (especialidade) => {
    return (
      <div className="text-center font-bold">
          {especialidade.especialidade}
      </div>
    )
}

const descricao = (dadosMes) => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <p><span className="font-bold">Total: </span>{dadosMes.atendimentos} pacientes atendidos.</p>
          <p><span className="font-bold">Meta Mensal: </span>{dadosMes.metaMensal} pacientes.</p>
          <p><span className="font-bold">Índice de Atendimento: </span>
            {calcularPorcentagem(dadosMes.atendimentos, dadosMes.metaMensal)}%
          </p>
        </div>
        <div className="flex flex-row h-[60px] mr-4">
          <img 
            src="/logo.png"
            width="60px"
            height="60px"
            alt="Logo Itaberá SP"
          />
        </div>
      </div>
      <div className="mt-4">
          <p>A especialidade {dadosMes.especialidade} atendeu {calcularPorcentagem(dadosMes.atendimentos, dadosMes.metaMensal)}% da meta mensal, com {calcularResultado(dadosMes)}
          </p>
      </div>
    </>
  )
}
  
const calcularPorcentagem = (atendidos, meta) => {
    if (meta === 0) {
      return 100;
    } else {
      const porcentagem = (atendidos / meta * 100);
  
      if (Number.isInteger(porcentagem)) {
        return porcentagem.toFixed(0).replace(".", ",");
      } else {
        return porcentagem.toFixed(2).replace(".", ",");
      }
    }
}

function calcularResultado(dadosMes) {
    const resultado = dadosMes.atendimentos - dadosMes.metaMensal;
  
    if (resultado > 0) {
      return `${resultado} atendimentos a mais do  que o esperado.`;
    } else if (resultado < 0) {
      return `${resultado * -1} atendimentos a menos do que o esperado.`;
    } else {
      return "100% da quantidade de atendimento esperada";
    }
}