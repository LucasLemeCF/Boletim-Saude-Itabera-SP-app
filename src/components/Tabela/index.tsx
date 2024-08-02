"use client"

import { dadosTabelaSchema, TabelaFormData } from '@/schemas/responseTabela';
import { Tabela } from '@/schemas/tabela';
import { zodResolver } from '@hookform/resolvers/zod';
import { toPng } from 'html-to-image';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Cirurgioes from './cirurgioes';
import ConverterData from './converterData';
import Especialidades from './especialidades';
import HeaderTabela from './headerTabela';

export default function Tabela() {
  let [data, setData] = useState(new Date());
  const imgRef = useRef(null);

  function BaixarTabela() {
    toPng(imgRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Boletim Saúde - " + ConverterData(data);
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  return (
    <div className="flex flex-col items-center justify-between mt-[50px] mb-[25px] border-collapse" ref={imgRef}>
      <HeaderTabela  
        data={data}
        setData={setData}
      /> 
      <Linhas data={data} BaixarTabela={BaixarTabela}/>
    </div>
  )
}

function Linhas({data, BaixarTabela}) {
  const [dadosTabela, setDadosTabela] = useState(null)
  const [isLoading, setLoading] = useState(true);
  
  const { control, register, handleSubmit, setValue } = useForm<TabelaFormData>({
    resolver: zodResolver(dadosTabelaSchema),
    defaultValues: {  
      linhas: montarValoresLinhas(dadosTabela)
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/tabela/' + ConverterData(data));   
        const dataResponse = await response.json();
        setDadosTabela(dataResponse);
        setValue("linhas", montarValoresLinhas(dataResponse))
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data, setValue]);

  const { fields, replace } = useFieldArray({
    control: control,
    name: "linhas"
  });

  useEffect(mostraValor, [fields]);

  function mostraValor() {
    console.log(fields);
  }

  if (isLoading) return Carregando()

  async function onSubmit(dadosNovos: TabelaFormData) {
    replace(montarTabelaFormData(dadosTabela, dadosNovos));
  }

  return (
    <>
      <form className="w-full">
        {TemDadadosEspecialidades({dadosTabela}) ? 
          <Especialidades dadosTabela={dadosTabela} replace={replace} register={register}/>
        : null}

        {TemDadadosCirurgioes({dadosTabela}) ? 
          <Cirurgioes dadosTabela={dadosTabela}/>
        : null}

        {!TemDadadosEspecialidades({dadosTabela}) && !TemDadadosCirurgioes({dadosTabela}) ?
          <p>Não foi possível encontrar dados para a data</p>
        : null}
      </form>
      <div className="flex items-center justify-between w-full mt-8">
        <Button texto={"Baixar"} color={"bg-blue-800"} onClick={BaixarTabela}/>
        <Button texto={"Gerar Gráfico"} color={"bg-red-700"} onClick={GerarGrafico}/>
        <Button texto={"Salvar"} color={"bg-green-800"} onClick={handleSubmit(onSubmit)}/>
      </div>
    </>
  )
}

interface ButtomProps {
  texto: string;
  color: string;
  onClick?: () => void;
}

function Button({ texto, color, onClick }: ButtomProps) {
  return (
    <button className={`w-[150px] h-[50px] rounded-[5px] text-white ${color}`} type="button" onClick={onClick}>{texto}</button>
  )
}

function GerarGrafico() {
  console.log("Gerar Gráfico");
}

function TemDadadosEspecialidades({dadosTabela}) {
  let temDados = false;

  dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
    if (cabecalho.especialidades.length > 0) {
      temDados = true;
    }
  });

  return temDados;
}

function TemDadadosCirurgioes({dadosTabela}) {
  let temDados = false;

  dadosTabela.cirurgioesCabecalhos.map((cabecalho) => {
    if (cabecalho.cirurgioes.length > 0) {
      temDados = true;
    }
  });

  return temDados;
}

function Carregando() {
  return (
    <p>Carregando...</p>
  )
}

function montarTabelaFormData(dadosTabela: Tabela, dadosNovos: TabelaFormData) {
  const resultado = [] as any;

  const linhas = montarValoresLinhas(dadosTabela);

  for (let i = 0; i < linhas.length; i++) {
    resultado.push({
      tipo: "ESPECIALIDADE_LINHA",
      componenteId: linhas[i].componenteId,
      posicao: linhas[i].posicao,
      pacientesAtendidos: dadosNovos.linhas[i].pacientesAtendidos
    });
  }

  return resultado;
}

function montarValoresLinhas(dadosTabela: Tabela) {
  const linhas = [] as any;

  if (dadosTabela !== null) {
    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
      cabecalho.especialidades.map((especialidade) => {
        linhas.push({
          tipo: "ESPECIALIDADE_LINHA",
          componenteId: especialidade.especialidadeId,
          posicao: especialidade.posicao,
          pacientesAtendidos: especialidade.pacientesAtendidosDia
        });
      });
    });
  }

  return linhas;
}