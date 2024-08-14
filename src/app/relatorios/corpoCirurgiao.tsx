import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LineChartCirurgiao from "../../components/Charts/Cirurgiao/LineChartCirurgiao";

Chart.register(CategoryScale);

export function CorpoCirurgiao({cirurgiao, procedimento}) {  
    const dadosMes = procedimento.resultadosMensais[0];

    return (
      <div className={`flex flex-col justify-items-start border-b border-black w-[891px] h-[630px] p-8`}> 
        {titulo(cirurgiao, procedimento)}
        {descricao(dadosMes)}
        <LineChartCirurgiao dadosMes={dadosMes}/>
      </div>
    );
}

const titulo = (cirurgiao, procedimento) => {
  return (
    <div className="text-center font-bold">
      {procedimento.nome + " - " +  cirurgiao.nome}
    </div>
  )
}

const descricao = (dadosMes) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-end">
        <p><span className="font-bold">Total: </span>{dadosMes.atendimentos} cirurgias realizadas.</p>
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
  )
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