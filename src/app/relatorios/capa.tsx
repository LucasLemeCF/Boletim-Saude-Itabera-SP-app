
import BarChart from "../../components/Charts/BarChart";
import LineChartCapa from "../../components/Charts/LineChartCapa";

export function Capa({especialidade, mes, ano}) {  
    const mesString = numeroParaMes(mes);

    console.log(especialidade);

    return (
      <div className={`flex flex-col justify-items-start border-b border-black w-[891px] h-[1260px] py-8`}> 
        {titulo(mesString, ano)}
        <BarChart dadosMes={especialidade}/>
        <LineChartCapa especialiade={especialidade}/>
      </div>
    );
}

const titulo = (mes, ano) => {
    return (
        <div className="flex justify-between h-[60px] px-8">
            <div className="w-[60px]"></div>
            <div className="text-center font-bold text-xl ml-4">Relatório de Atendimentos de {mes} de {ano}</div>
            <img 
                src="/logo.png"
                width="60px"
                height="60px"
                alt="Logo Itaberá SP"
                className="mr-4"
            />
        </div>
    )
}

function numeroParaMes(numero: string): string {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const index = parseInt(numero, 10) - 1;
    return meses[index] || "Mês inválido";
}