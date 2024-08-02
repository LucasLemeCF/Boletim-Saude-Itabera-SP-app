import { Tabela } from '@/schemas/tabela';
import React from 'react';

export default function Especialidades({ dadosTabela, register }: { dadosTabela: Tabela,  register: (data:any)=>void }) {
  return (
    <div className="border border-t-0 border-black bg-[#E2EFDB]">
      {dadosTabela.especialidadesCabecalhos.map((field, index) => {
        return (
          <div key={index}>
            {cabecalhoEspecialidade(field, index, register)}
          </div>
        );
      })}
    </div>
  )
}

const cabecalhoEspecialidade = (cabecalho, indexCabecalho, register) => {
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

      {cabecalho.especialidades.map((especialidade, index) => 
        <div key={index}>
          {linhaEspecialidade(especialidade, ((indexCabecalho * (cabecalho.especialidades.length + 1)) + index), register)}
        </div>
      )}
    </div>
  )
}

const linhaEspecialidade = (especialidade, posicaoLinha, register) => {
  return (
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px] px-1">
        <p>{especialidade.especialidade}</p>
      </div>

      <input  className="flex items-center justify-center border-black font-semibold text-center w-[100px] h-[25px] bg-[#E2EFDB]" 
        type="number"
        name={`linhas.${posicaoLinha}.pacientesAtendidos`} {...register(`linhas.${posicaoLinha}.pacientesAtendidos`, { valueAsNumber: true })}
      />
     
      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{especialidade.metaDiaria}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{calcularPorcentagem(especialidade.pacientesAtendidosDia, especialidade.metaDiaria)}%</p>
      </div>

      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{especialidade.pacientesAtendidosMes}</p>
      </div>
      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{especialidade.metaMensal}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{calcularPorcentagem(especialidade.pacientesAtendidosMes, especialidade.metaMensal)}%</p>
      </div>
    </div>
  )
}
  
export const calcularPorcentagem = (atendidos, meta) => {
  if (meta === 0) {
      return 100;
  } else {
    const porcentagem = Number((atendidos / meta * 100).toFixed(1));

    if (porcentagem % 1 == 0) {
      return porcentagem.toFixed(0);
    } else {
      return porcentagem.toFixed(1);
    }
  }
}