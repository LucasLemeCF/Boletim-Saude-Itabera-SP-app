import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LineChart from "../../components/Charts/LineChart";

Chart.register(CategoryScale);

export function Pagina({especialidade}) {  
    const dadosMes = separarDadosMes(especialidade, 6, 2024);

    return (
      <div className={`flex flex-col justify-items-start border border-2 border-black w-[891px] h-[630px] p-8`}> 
        {titulo(especialidade)}
        {descricao(dadosMes)}
        <LineChart dadosMes={dadosMes} especialidade={especialidade.especialidade}/>
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
            <div>
                <p><span className="font-bold">Total: </span>{dadosMes.atendimentos} pacientes atendidos.</p>
                <p><span className="font-bold">Meta Mensal: </span>{dadosMes.metaMensal} pacientes.</p>
                <p><span className="font-bold">Índice de Atendimento: </span>
                    {calcularPorcentagem(dadosMes.atendimentos, dadosMes.metaMensal)}%
                </p>
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

function separarDadosMes(especialidade, mesAtual, anoAtual) {
    let dadosMes = [];
  
    especialidade.resultadosMensais.map(mes => {
      if (mes.mes === mesAtual && mes.ano === anoAtual) {
        dadosMes = mes;
      }
    });
  
    return dadosMes;
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