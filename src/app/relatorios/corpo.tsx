import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LineChart from "../../components/Charts/PieChart";

Chart.register(CategoryScale);

export function Pagina({especialidade}) {  
    return (
      <div className={`flex flex-col justify-items-start border border-2 border-black w-[891px] h-[630px] p-8`}> 
        {titulo(especialidade)}
        {descricao(especialidade)}
        <LineChart especialidade={especialidade} />
      </div>
    );
}

const titulo = (especialidade) => {
    return (
        <div className="text-center">
            {especialidade.especialidade}
        </div>
    )
}

const descricao = (especialidade) => {
    return (
        <>
            <div>
                <p>Total: {especialidade.resultadosMensais[0].atendimentos} pacientes atendidos.</p>
                <p>Meta Mensal: {especialidade.resultadosMensais[0].metaMensal} pacientes.</p>
                <p>Índice de Atendimento: {calcularPorcentagem(especialidade.resultadosMensais[0].atendimentos, especialidade.resultadosMensais[0].metaMensal)}%</p>
            </div>
            <div>
                <p>Total: {especialidade.especialidade}</p>
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