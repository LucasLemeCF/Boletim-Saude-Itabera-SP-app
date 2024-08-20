import { UseFormRegister } from 'react-hook-form';
import { CabecalhoTabela, EspecialidadesTabela, Tabela } from '../../schemas/tabela';

interface EspecialidadesProps {
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

export default function Especialidades({ dadosTabela, register, watchLinha }: EspecialidadesProps) {
  return (
    <div className="border border-t-0 border-black bg-[#E2EFDB]">
      {dadosTabela.especialidadesCabecalhos.map((field, index) => {
        let tamanhoCabecalhoAnterior = Number(dadosTabela.especialidadesCabecalhos[index - 1]?.especialidades.length);
        if (Number.isNaN(tamanhoCabecalhoAnterior)) {
          tamanhoCabecalhoAnterior = 0;
        }

        return (
          <div key={index}>
            <CabecalhoEspecialidade cabecalho={field} tamanhoCabecalhoAnterior={tamanhoCabecalhoAnterior} indexCabecalho={index} register={register} watchLinha={watchLinha}/>
          </div>
        );
      })}
    </div>
  )
}

interface CabecalhoEspecialidadesProps {
  cabecalho: CabecalhoTabela;
  tamanhoCabecalhoAnterior: Number;
  indexCabecalho: Number;
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

function CabecalhoEspecialidade({ cabecalho, tamanhoCabecalhoAnterior, indexCabecalho, register, watchLinha}: CabecalhoEspecialidadesProps) {
  return (
    <div>
      <div className="flex items-center justify-between divide-x divide-y border-black bg-[#337B5B]">
        <div className="flex items-center justify-between border-black border-t w-[300px] h-[50px] px-1">
          <p className='w-full font-semibold text-center text-white'>{cabecalho.textos[0].texto}</p>
        </div>

        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Pacientes Atendidos</p>
        </div>
        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Meta de Atend.</p>
        </div>
        <div className="flex items-center justify-center border-black text-center text-white w-[100px] h-[50px]">
          <p>%</p>
        </div>

        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Pacientes Atendidos</p>
        </div>
        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Meta de Atend.</p>
        </div>
        <div className="flex items-center justify-center border-black text-center text-white w-[100px] h-[50px]">
          <p>%</p>
        </div>
      </div>

      {cabecalho.especialidades.map((especialidade, index) => {
        const novoIndexCabecalho = Number(indexCabecalho);
        const tamanhoCabecalho = Number(tamanhoCabecalhoAnterior);
        const novoIndex = index;

        const posicaoLinha = (novoIndexCabecalho * tamanhoCabecalho + novoIndex);

        return (
          <div key={index}>
            <LinhaEspecialidade especialidade={especialidade} posicaoLinha={posicaoLinha} register={register} watchLinha={watchLinha}/>
          </div>
        )}
      )}
    </div>
  )
}


interface LinhaEspecialidadeProps {
  especialidade: EspecialidadesTabela;
  posicaoLinha: Number;
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

function LinhaEspecialidade({especialidade, posicaoLinha, register, watchLinha}: LinhaEspecialidadeProps) {
  const pacientesAtendidos = buscarLinha(especialidade.posicao, watchLinha);

  return (
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px] px-1">
        <p>{especialidade.especialidade}</p>
      </div>

      <input  className="flex items-center justify-center border-black font-semibold text-center w-[100px] h-[25px] bg-[#E2EFDB]" 
        name={`linhas.${posicaoLinha}.pacientesAtendidos`} {...register(`linhas.${Number(posicaoLinha)}.pacientesAtendidos`, { valueAsNumber: true, required: "Digite os numeros restantes" })}
      />
     
      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{especialidade.metaDiaria}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{calcularPorcentagem(pacientesAtendidos, especialidade.metaDiaria)}%</p>
      </div>

      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{(especialidade.pacientesAtendidosMes - especialidade.pacientesAtendidosDia + pacientesAtendidos)}</p>
      </div>
      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{especialidade.metaMensal}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{calcularPorcentagem((especialidade.pacientesAtendidosMes - especialidade.pacientesAtendidosDia + pacientesAtendidos), especialidade.metaMensal)}%</p>
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
  
export const calcularPorcentagem = (atendidos, meta) => {
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