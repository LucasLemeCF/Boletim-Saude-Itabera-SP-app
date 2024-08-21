import { UseFormRegister } from "react-hook-form";
import { Tabela } from "../../../schemas/tabela";

interface CirurgioesProps {
  dadosTabela: Tabela;
  register: UseFormRegister<{
    data?: string;
    linhas?: {
      tipo?: string;
      componenteId?: number;
      posicao?: number;
      pacientesAtendidos?: number;
    }[];
  }>;
  watchLinha?: any;
}

export default function Cirurgiao({ dadosTabela, register, watchLinha }: CirurgioesProps) {
  const qtdLinhasEspecialidade = calcularQtdLinhasEspecialidade(dadosTabela);

  return (
    <div className='mt-0 border-t-0 border border-black'>
      {dadosTabela.cirurgioesCabecalhos.map((cabecalho, index) => {
        let tamanhoCabecalhoAnterior = Number(dadosTabela.cirurgioesCabecalhos[index - 1]?.cirurgioes.length);
        if (Number.isNaN(tamanhoCabecalhoAnterior)) {
          tamanhoCabecalhoAnterior = 0;
        }

        return (
          <div key={index}>
            {cabecalhoCirurgioes(cabecalho, tamanhoCabecalhoAnterior, qtdLinhasEspecialidade, index, register, watchLinha)}
          </div>
        )
      })}
    </div>
  )
}

function calcularQtdLinhasEspecialidade(dadosTabela) {
  let qtdLinhas = 0;

  dadosTabela.especialidadesCabecalhos.map((especialidadesCabecalho) => {
    especialidadesCabecalho.especialidades.map(() => {
      qtdLinhas += 1;
    });
  });

  return qtdLinhas;
}
  
const cabecalhoCirurgioes = (cabecalho, tamanhoCabecalhoAnterior, qtdLinhasEspecialidade, indexCabecalho, register, watchLinha) => {
  return (
    <>
      <div className="flex items-center justify-between divide-x border-black bg-[#337B5B]">
        <div className="flex items-center justify-between border-black w-[300px] h-[50px] px-1">
          <p className='w-full font-semibold text-center text-white'>{cabecalho.textos[0].texto}</p>
        </div>

        <div className="flex items-center justify-between border-black w-[300px] h-[50px] px-1">
          <p className='w-full font-semibold text-center text-white'>{cabecalho.textos[1].texto}</p>
        </div>

        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Diário</p>
        </div>
        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Mensal</p>
        </div>
        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Anual</p>
        </div>
      </div>

      {cabecalho.cirurgioes.map((cirurgiao, index) => {
        const novoIndexCabecalho = Number(indexCabecalho);
        const tamanhoCabecalho = Number(tamanhoCabecalhoAnterior);
        const novoIndex = index;

        const posicaoLinha = (qtdLinhasEspecialidade + novoIndexCabecalho * tamanhoCabecalho + novoIndex);

        return (
          <div key={index}>
            {linhaCirurgiao(cirurgiao, posicaoLinha, register, watchLinha)}
          </div>
        )
      })}
    </>
  )
}
  
const linhaCirurgiao = (cirurgiao, posicaoLinha, register, watchLinha) => {
  const pacientesAtendidos = buscarLinha(cirurgiao.posicao, watchLinha);

  return (
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px] px-1">
        <p>{cirurgiao.cirurgiao}</p>
      </div>

      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px] px-1">
        <p>{cirurgiao.procedimento}</p>
      </div>

      <input  className="flex items-center justify-center border-black text-center text-center w-[100px] h-[25px] bg-[#E2EFDB]" 
        name={`linhas.${posicaoLinha}.pacientesAtendidos`} {...register(`linhas.${Number(posicaoLinha)}.pacientesAtendidos`, { valueAsNumber: true, required: "Digite os numeros restantes" })}
      />

      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{cirurgiao.pacientesAtendidosMes - cirurgiao.pacientesAtendidosDia + pacientesAtendidos}</p>
      </div>

      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{cirurgiao.pacientesAtendidosAno - cirurgiao.pacientesAtendidosDia + pacientesAtendidos}</p>
      </div>
    </div>
  )
}

function buscarLinha(posicao, watchLinha) {
  for(let i = 0; i < watchLinha.length; i++) {
    if (watchLinha[i].posicao === posicao) {
      if (Number.isNaN(watchLinha[i].pacientesAtendidos)) {
        return 0;
      } else {
        return watchLinha[i].pacientesAtendidos;
      }
    }
  }
}