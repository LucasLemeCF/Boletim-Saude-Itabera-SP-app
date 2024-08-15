import { CapaCirurgiao } from "./capaCirurgiao";
import { CorpoCirurgiao } from "./corpoCirurgiao";

export function RelatorioCirurgiao({cirurgioes, mesRelatorio, anoRelatorio}) {
    return (
      <>
        <CapaCirurgiao cirurgioes={cirurgioes} mes={mesRelatorio} ano={anoRelatorio}/>
        {cirurgioes.map((cirurgiao, index) => (
          cirurgiao.procedimentos.map(procedimento => (
            <CorpoCirurgiao key={index} cirurgiao={cirurgiao} procedimento={procedimento}/> 
          ))
        ))}
      </>
    )
}