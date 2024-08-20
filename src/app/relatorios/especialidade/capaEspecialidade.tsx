/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import BarChartCapaEspecialidade from "../../../components/Charts/Especialidade/BarChartCapaEspecialidade";
import BarChartPorcentagem from "../../../components/Charts/Especialidade/BarChartPorcentagem";

export function CapaEspecialidade({especialidades, mes, ano, chartRef}) {
    return (
        <>
            <div className={`flex flex-col justify-items-start border-b border-black w-[891px] h-[1260px] pt-4 pb-8`}>
                {titulo(mes, ano)} 
                <BarChartCapaEspecialidade especialiade={especialidades} chartRef={chartRef}/>
                {descricao(especialidades)}
                <BarChartPorcentagem dadosMes={especialidades} chartRef={chartRef}/>
            </div>
        </>
    );
}

const titulo = (mes, ano) => {
    return (
        <div className="flex justify-between h-[60px] px-8">
            <div className="w-[60px]"></div>
            <div className="text-center font-bold text-xl ml-4">Relatório de Atendimentos de {mes} de {ano}</div>
            <Image 
                src="/logo.png"
                width={60}
                height={60}
                alt="Logo Itaberá SP"
                className="mr-4"
            />
        </div>
    )
}

const descricao = (especialidades) => {
    return (
        <div className="flex flex-col justify-between h-[30px] mt-4 px-8">
            <div className="text-center font-bold text-base">No total foram atendidos {somarAtendimentos(especialidades)} pacientes.</div>
        </div>
    )
}

function somarAtendimentos(especialidades) {
    let soma = 0;
    
    especialidades.map(especialidade => {
      especialidade.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
        soma += resultadosDiario.atendimentos;
      });
    });
  
    return soma;
}