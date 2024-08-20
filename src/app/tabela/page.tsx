"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { toPng } from 'html-to-image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSave } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { dadosTabelaSchema, TabelaFormData } from '../../schemas/responseTabela';
import Cirurgioes from './cirurgioes';
import ConverterData from './converterData';
import Especialidades from './especialidades';
import HeaderTabela from './headerTabela';
import { MontarCabecalhos, montarValoresLinhas } from './montarDados';
import { RodapeCirurgioes } from './rodapeCirurgioes';
import { RodapeEspecialidades } from './rodapeEspecialidades';
import { RodapeTotal } from './rodapeTotal';

export default function Tabela() {
  const [data, setData] = useState(new Date());
  const imgRef = useRef(null);

  function BaixarTabela() {
    toPng(imgRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Boletim Saúde - " + ConverterData(data);
        link.href = dataUrl;
        link.click();
      })
  }
  
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-between mt-[50px] mb-[25px] border-collapse" ref={imgRef}>
          <HeaderTabela data={data} setData={setData}/> 
          <Linhas dataCalendario={data} BaixarTabela={BaixarTabela}/>
        </div>
      </div>
    </main>
  )
}

function Linhas({dataCalendario, BaixarTabela}) {
  const [dadosTabela, setDadosTabela] = useState(null)
  const [isLoading, setLoading] = useState(true);
  
  const { watch, register, handleSubmit, setValue, getValues } = useForm<TabelaFormData>({
    resolver: zodResolver(dadosTabelaSchema),
    defaultValues: {  
      data: ConverterData(dataCalendario),
      linhas: montarValoresLinhas(dadosTabela)
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/tabela/' + ConverterData(dataCalendario));   
        const dataResponse = await response.json();
        setDadosTabela(dataResponse);
        setValue("linhas", montarValoresLinhas(dataResponse))
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataCalendario, getValues, setValue]);

  if (isLoading) return Carregando()

  async function onSubmit(dadosNovos: TabelaFormData) {
    const resultado = {
      data: ConverterData(dataCalendario),
      linhas: dadosNovos.linhas,
      cabecalhos: MontarCabecalhos(dadosTabela)
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultado)
    };

    fetch('http://localhost:8080/api/tabela', requestOptions)
      .then(response => response)

    console.log("Tabela salva com sucesso!");
  }

  const watchLinha = watch("linhas");

  return (
    <>
      <form className="w-full">
        {TemDadadosEspecialidades({dadosTabela}) ? 
          <Especialidades dadosTabela={dadosTabela} register={register} watchLinha={watchLinha}/>
        : null}

        <RodapeEspecialidades dadosTabela={dadosTabela} linhasTabela={watchLinha}/>

        {TemDadadosCirurgioes({dadosTabela}) ? 
          <Cirurgioes dadosTabela={dadosTabela} register={register} watchLinha={watchLinha}/>
        : null}

        <RodapeCirurgioes dadosTabela={dadosTabela} linhasTabela={watchLinha}/>
        <RodapeTotal dadosTabela={dadosTabela} linhasTabela={watchLinha}/>

        {!TemDadadosEspecialidades({dadosTabela}) && !TemDadadosCirurgioes({dadosTabela}) ?
          <p>Não foi possível encontrar dados para a data</p>
        : null}
      </form>
      
      <div className="flex items-center justify-end gap-8 w-full mt-8">
        <Button texto={"Baixar"} color={"bg-blue-800"} onClick={BaixarTabela} type={"button"}/>
        <Button texto={"Salvar"} color={"bg-green-800"} onClick={handleSubmit(onSubmit)} type={"button"}/>
      </div>
    </>
  )
}

interface ButtomProps {
  texto: string;
  color: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  comBotao?: boolean;
}

export function Button({ texto, color, onClick, type, comBotao = true}: ButtomProps) {
  return (
    <>
      {
        comBotao ?
        <button className={`w-[150px] h-[50px] rounded-[5px] text-white flex items-center justify-start ${color}`} type={type} onClick={onClick}>
          {IconeBotao(texto)}
          <div className="ml-4">{texto}</div>
        </button>
        :
        <button className={`w-[150px] h-[50px] rounded-[5px] text-white flex items-center justify-center ${color}`} type={type} onClick={onClick}>
          <div className="ml-4">{texto}</div>
        </button>
      }
    </>
  )
}

const IconeBotao = (texto: String) => {
  if (texto === "Baixar") {
    return <MdOutlineFileDownload className="w-6 h-6 ml-4"/>
  } else if (texto === "Salvar") {
    return <BiSave className="w-6 h-6 ml-4"/>
  } else {
    return <div></div>
  }
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