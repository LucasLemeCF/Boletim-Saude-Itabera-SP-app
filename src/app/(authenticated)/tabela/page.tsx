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
import ButtonLocal from '../../../utils/ButtonLocal';
import ConverterData from '../../../utils/converterData';
import Cirurgioes from './cirurgioes';
import Especialidades from './especialidades';
import HeaderTabela from './headerTabela';
import { montarCabecalhos, montarValoresLinhas } from './montarDados';
import { RodapeCirurgioes } from './rodapeCirurgioes';
import { RodapeEspecialidades } from './rodapeEspecialidades';
import { RodapeTotal } from './rodapeTotal';

export default function Tabela() {
  const { data: session } = useSession();
  const [data, setData] = useState(new Date());
  
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">
      <div className="flex flex-col items-center justify-between pt-[50px] pb-[25px]">
        <div className="flex flex-col items-center justify-between mt-0 mb-0 border-collapse">
          {
            session ?
            <ConteudoTabela dataCalendario={data} setData={setData} session={session}/>
            : CarregandoSession()
          }
        </div>
      </div>
    </main>
  )
}

function ConteudoTabela({dataCalendario, setData, session}) {
  const [dadosTabela, setDadosTabela] = useState(null)
  const [isLoading, setLoading] = useState(true);
  const { toast } = useToast()
  const imgRef = useRef(null);
  
  const { watch, register, handleSubmit, setValue, getValues } = useForm<TabelaFormData>({
    resolver: zodResolver(dadosTabelaSchema),
    defaultValues: {  
      data: ConverterData(dataCalendario),
      linhas: montarValoresLinhas(dadosTabela)
    }
  });

  function BaixarTabela() {
    toJpeg(imgRef.current, { cacheBust: true, quality: 1 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Boletim Saúde - " + ConverterData(dataCalendario);
        link.href = dataUrl;
        link.click();
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + '/api/tabela/' + ConverterData(dataCalendario), {
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
      cabecalhos: montarCabecalhos(dadosTabela)
    }

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'authorization': session?.user.token,
      },
      body: JSON.stringify(resultado)
    };

    fetch(process.env.NEXT_PUBLIC_API + '/api/tabela', requestOptions).then(response => response)
    toast({description: "Tabela salva com sucesso!"})
  }

  const watchLinha = watch("linhas");

  return (
    <>
      <div ref={imgRef}>
        <HeaderTabela data={dataCalendario} setData={setData}/> 
        {(dadosTabela != null) && (TemDadosEspecialidades({dadosTabela}) || TemDadadosCirurgioes({dadosTabela})) ?
          <form className="w-full">
            {TemDadosEspecialidades({dadosTabela}) ? 
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
      </div>
      <div className="flex items-center justify-end gap-8 w-full mt-8">
        <ButtonLocal texto={"Baixar"} color={"bg-blue-800"} onClick={BaixarTabela} type={"button"} icon={"Baixar"}/>
        <ButtonLocal texto={"Salvar"} color={"bg-green-800"} onClick={handleSubmit(onSubmit)} type={"button"} icon={"Salvar"}/>
      </div>
      <Toaster/>
    </>
  )
}

function TemDadosEspecialidades({dadosTabela}) {
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