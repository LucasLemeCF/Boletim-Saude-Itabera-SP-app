
import Image from "next/image";
import BarChartCapaCirurgiao from "../../components/Charts/Cirurgiao/BarChartCapaCirurgiao";
import TotalMesesCirurgiao from "../../components/Charts/Cirurgiao/TotalMesesCirurgiao";
import { numeroParaMes } from "../../utils/meses";

export function CapaCirurgiao({cirurgioes, mes, ano}) {  
    return (
      <div className={`flex flex-col justify-items-start border-b border-black w-[891px] h-[1260px] pt-4 pb-8`}> 
        {titulo(mes, ano)}
        <BarChartCapaCirurgiao cirurgioes={cirurgioes}/>
        {descricao(cirurgioes, mes)}
        <TotalMesesCirurgiao ano={ano}/>
      </div>
    );
}

const titulo = (mesInt, ano) => {
    const mes = numeroParaMes(mesInt);

    return (
        <div className="flex justify-between h-[60px] px-8">
            <div className="w-[60px]"></div>
            <div className="text-center font-bold text-xl ml-4">Relatório de Cirurgias de {mes} de {ano}</div>
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

const descricao = (cirurgioes, mesInt) => {
    const mes = numeroParaMes(mesInt);

    return (
        <div className="flex flex-col justify-between h-[30px] mt-4 px-8">
            <div className="text-center font-bold text-base">No total foram realizadas {somarAtendimentos(cirurgioes)} cirurgias no mês de {mes}.</div>
        </div>
    )
}

const somarAtendimentos = (cirurgioes) => {
    let soma = 0;
    
    cirurgioes.map(cirurgiao => {
        cirurgiao.procedimentos.map(procedimento => {
            procedimento.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
                soma += resultadosDiario.atendimentos;
            });
        });
    });
  
    return soma;
}