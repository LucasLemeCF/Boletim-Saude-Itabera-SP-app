import { testaFormulario } from '@/actions/text';
import { TabelaFormData, dadosTabelaSchema } from '@/schemas/text';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

export interface Tabela {
  data: string;
  especialidadesCabecalhos: CabecalhoTabela[];
}

export interface CabecalhoTabela {
  posicao: number;
  textos: TextosCabalho[];
  especialidades: EspecialidadesTabela[];
}

export interface TextosCabalho {
  id: number;
  texto: string;
}

export interface EspecialidadesTabela {
  posicao: number;
  especialidadeId: number;
  especialidade: string;
  pacientesAtendidosDia: number;
  metaDiaria: number;
  pacientesAtendidosMes: number;
  metaMensal: number;
}

export default function Especialidades({ dadosTabela }: { dadosTabela: Tabela }) {
  const { control, register } = useForm<Tabela>({
    defaultValues: dadosTabela
  });

  const { fields, append, prepend, insert } = useFieldArray({
    control: control,
    name: "especialidadesCabecalhos",
  });

  const form = useForm<TabelaFormData>({
    resolver: zodResolver(dadosTabelaSchema),
    defaultValues: {
      data: "",
      linhas: dadosTabela.especialidadesCabecalhos.flatMap((cabecalho) => cabecalho.especialidades.map((especialidade) => ({
        pacientesAtendidos: especialidade.pacientesAtendidosDia,
      })))
    }
  })
  
  async function onSubmit(dados: TabelaFormData) {
    const tabela = {
      data: dados.data,
      linhas: dadosTabela.especialidadesCabecalhos.map((cabecalho, indexCabecalho) => 
        cabecalho.especialidades.map((especialidade, index) => ({
          tipo: "ESPECIALIDADE_LINHA",
          componenteId: especialidade.especialidadeId,
          posicao: indexCabecalho * (cabecalho.especialidades.length + 1) + index,
          pacientesAtendidos: especialidade.pacientesAtendidosDia
        }))
      )} as TabelaFormData;

      console.log(tabela);

    await testaFormulario(tabela);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input type="text" {...form.register("data")} />
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            {cabecalhoEspecialidade(field , index, form)}
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  )
}
  
const cabecalhoEspecialidade = (cabecalho: CabecalhoTabela, indexCabecalho, form) => {
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
          {linhaEspecialidade(especialidade, (indexCabecalho * (cabecalho.especialidades.length + 1) + index), form)}
        </div>
      )}
    </div>
  )
}
  
const linhaEspecialidade = (data, posicaoLinha, form) => {
  return (
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      {/* <div>
        {posicaoLinha}
      </div> */}

      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px] px-1">
        <p>{data.especialidade}</p>
      </div>

      <input  className="flex items-center justify-center border-black font-semibold text-center w-[100px] h-[25px] bg-[#E2EFDB]" 
        type="number" 
        name={`linhas.${posicaoLinha}.pacientesAtendidos`} {...form.register(`linhas.${posicaoLinha}.pacientesAtendidos`, { valueAsNumber: true })}
      />
     
      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{data.metaDiaria}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{calcularPorcentagem(data.pacientesAtendidosDia, data.metaDiaria)}%</p>
      </div>

      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{data.pacientesAtendidosMes}</p>
      </div>
      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{data.metaMensal}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{calcularPorcentagem(data.pacientesAtendidosMes, data.metaMensal)}%</p>
      </div>
    </div>
  )
}
  
const calcularPorcentagem = (atendidos, meta) => {
  if (meta === 0) {
    return 100;
  } else {
    const porcentagem = (atendidos / meta * 100);
    return porcentagem % 1 === 0 ? porcentagem.toFixed(0) : porcentagem.toFixed(1);
  }
  
}