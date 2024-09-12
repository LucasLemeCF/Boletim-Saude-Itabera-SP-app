"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { toJpeg } from 'html-to-image';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { Toaster } from "../../../components/ui/toaster";
import { useToast } from '../../../components/ui/use-toast';
import { dadosTabelaSchema, TabelaFormData } from '../../../schemas/responseTabela';
import Button from '../../../utils/Button';
import Cirurgioes from './cirurgioes';
import ConverterData from './converterData';
import Especialidades from './especialidades';
import HeaderTabela from './headerTabela';
import { MontarCabecalhos, montarValoresLinhas } from './montarDados';
import { RodapeCirurgioes } from './rodapeCirurgioes';
import { RodapeEspecialidades } from './rodapeEspecialidades';
import { RodapeTotal } from './rodapeTotal';

export default function Tabela() {
  const { data: session } = useSession();
  const [data, setData] = useState(new Date());
  const imgRef = useRef(null);

  function BaixarTabela() {
    toJpeg(imgRef.current, { cacheBust: false })
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
          {
            session ?
            <>
              <HeaderTabela data={data} setData={setData}/> 
              <Linhas dataCalendario={data} BaixarTabela={BaixarTabela} session={session}/>
            </>
            : CarregandoSession()
          }
        </div>
      </div>
    </main>
  )
}

function Linhas({dataCalendario, BaixarTabela, session}) {
  const [dadosTabela, setDadosTabela] = useState(null)
  const [isLoading, setLoading] = useState(true);
  const { toast } = useToast()
  
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
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + '/api/tabela/' + ConverterData(dataCalendario), {
          method: "GET",
          headers: {
            authorization: session?.user.token,
          },
        }); 
        const dataResponse = await response.json();
        setDadosTabela(dataResponse);
        setValue("linhas", montarValoresLinhas(dataResponse))
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataCalendario, getValues, session?.user.token, setValue]);

  if (isLoading) return Carregando()

  async function onSubmit(dadosNovos: TabelaFormData) {
    const resultado = {
      data: ConverterData(dataCalendario),
      linhas: dadosNovos.linhas,
      cabecalhos: MontarCabecalhos(dadosTabela)
    }

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'authorization': session?.user.token,
      },
      body: JSON.stringify(resultado)
    };

    fetch(process.env.NEXT_PUBLIC_BASE_API + '/api/tabela', requestOptions).then(response => response)
    toast({description: "Tabela salva com sucesso!"})
  }

  const watchLinha = watch("linhas");

  return (
    <>
      {(dadosTabela != null) && (TemDadadosEspecialidades({dadosTabela}) || TemDadadosCirurgioes({dadosTabela})) ?
        <form className="w-full">
          {TemDadadosEspecialidades({dadosTabela}) ? 
            <>
              <Especialidades dadosTabela={dadosTabela} register={register} watchLinha={watchLinha}/>
              <RodapeEspecialidades dadosTabela={dadosTabela} linhasTabela={watchLinha}/>
            </>
          : null}

          {TemDadadosCirurgioes({dadosTabela}) ? 
            <>
              <Cirurgioes dadosTabela={dadosTabela} register={register} watchLinha={watchLinha}/>
              <RodapeCirurgioes dadosTabela={dadosTabela} linhasTabela={watchLinha}/>
            </>
          : null}

          <RodapeTotal dadosTabela={dadosTabela} linhasTabela={watchLinha}/>
        </form>
        : <DadosNaoEncontrados/>      
      }
      <div className="flex items-center justify-end gap-8 w-full mt-8">
        <Button texto={"Baixar"} color={"bg-blue-800"} onClick={BaixarTabela} type={"button"}/>
        <Button texto={"Salvar"} color={"bg-green-800"} onClick={handleSubmit(onSubmit)} type={"button"}/>
      </div>
      <Toaster/>
    </>
  )
}

function TemDadadosEspecialidades({dadosTabela}) {
  let temDados = false;

  if(dadosTabela.especialidadesCabecalhos !== undefined) {
    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
      if (cabecalho.especialidades.length > 0) {
        temDados = true;
      }
    });
  }

  return temDados;
}

function TemDadadosCirurgioes({dadosTabela}) {
  let temDados = false;

  if(dadosTabela.especialidadesCabecalhos !== undefined) {
    dadosTabela.cirurgioesCabecalhos.map((cabecalho) => {
      if (cabecalho.cirurgioes.length > 0) {
        temDados = true;
      }
    });
  }

  return temDados;
}

function CarregandoSession() {
  return (
    <div className="bg-[#337B5B] w-40 h-16 border rounded-[5px] text-white flex items-center justify-center">
      <CgSpinner className="animate-spin h-5 w-5 mr-1"/>
      <p>Carregando...</p>
    </div>
  )
}

function Carregando() {
  return (
    <div className="bg-[#E2EFDB] w-full min-w-40 h-[100px] border border-black flex items-center justify-center">
      <CgSpinner className="animate-spin h-5 w-5 mr-1"/>
      <p>Carregando...</p>
    </div>
  )
}

function DadosNaoEncontrados() {
  return (
    <div className="bg-[#E2EFDB] w-full min-w-40 h-[100px] border border-black flex items-center justify-center">
      <p>Não foi possível encontrar tabelas cadastradas</p>
    </div>
  )
}