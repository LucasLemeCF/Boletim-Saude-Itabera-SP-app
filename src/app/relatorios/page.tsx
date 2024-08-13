"use client"

import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import generatePDF, { Options, usePDF } from "react-to-pdf";
import { Form } from "../../components/ui/form";
import { RelatorioFormData } from '../../schemas/relatorio';
import { Button } from "../tabela/page";
import { CapaCirurgiao } from "./capaCirurgiao";
import { CapaEspecialidade } from "./capaEspecialidade";
import { CorpoEspecialidade } from "./corpoEspecialidade";
import { SelectMonth, SelectTipoRelatorio, SelectYear } from "./select";

export default function Relatorio() {
  return (
    <div className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">  
      <Paginas/>
    </div>
  );
}

function Paginas() {
  const [dadosRelatorio, setDadosRelatorio] = useState(null)
  const [tipoRelatorio, setTipoRelatorio] = useState("especialidade");
  const [mesRelatorio, setMesRelatorio] = useState(buscaMesAtual());
  const [anoRelatorio, setAnoRelatorio] = useState((new Date().getFullYear()).toString());
  const [isLoading, setLoading] = useState(true);

  const { targetRef } = usePDF({filename: 'page.pdf'});
  
  const { control, handleSubmit } = useForm<RelatorioFormData>({
  });

  const form = useForm<RelatorioFormData>({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/' + tipoRelatorio + '/' + mesRelatorio + '-' + anoRelatorio);   
        console.log('http://localhost:8080/api/' + tipoRelatorio + '/' + mesRelatorio + '-' + anoRelatorio);
        const dataResponse = await response.json();
        setDadosRelatorio(dataResponse);
        console.log(dataResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [anoRelatorio, mesRelatorio, tipoRelatorio]);

  if (isLoading) return Carregando()

  const options: Options = {
    filename: "Relatório Médico - " + mesRelatorio + "-" + anoRelatorio + ".pdf",
  };

  const downloadPdf = () => generatePDF(targetRef, options);

  async function onSubmit(dadosNovos: RelatorioFormData) {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/' + dadosNovos.tipo + '/' + dadosNovos.mes + '-' + dadosNovos.ano);   
        console.log('http://localhost:8080/api/' + dadosNovos.tipo + '/' + dadosNovos.mes + '-' + dadosNovos.ano);
        const dataResponse = await response.json();
        setDadosRelatorio(dataResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setTipoRelatorio(dadosNovos.tipo);
    setMesRelatorio(dadosNovos.mes);
    setAnoRelatorio(dadosNovos.ano);
  }

  return (
    <Form {...form}>
      <form className="flex justify-between w-[891px] mt-8">
        <Button texto={"Baixar"} color={"bg-blue-800"} onClick={() => downloadPdf()} type={"button"}/>
        <SelectTipoRelatorio control={control}/>
        <SelectMonth control={control}/>
        <SelectYear control={control}/>
        <Button texto={"Gerar Relatório"} color={"bg-[#337B5B]"} onClick={handleSubmit(onSubmit)} type={"button"}/>
      </form>
      {
        TemDadados(dadosRelatorio) ? 
        <div ref={targetRef} className="flex flex-col items-center justify-between mt-[50px] mb-[25px] w-[891px]"> 
          {tipoRelatorio == "especialidade" ?
            <RelatorioEspecialidade dadosRelatorio={dadosRelatorio} mesRelatorio={mesRelatorio} anoRelatorio={anoRelatorio}/>
            :
            <RelatorioCirurgiao dadosRelatorio={dadosRelatorio} mesRelatorio={mesRelatorio} anoRelatorio={anoRelatorio}/>
          }
         
        </div>
        :
        <div className="text-white rounded-[5px] mt-20 p-4 bg-[#337B5B]">
          <p>Não foi possível encontrar dados para a data selecionada</p> 
        </div>
      }
    </Form>
  );
}

function TemDadados(dadosTabela) {
  let temDados = false;

  if (dadosTabela && dadosTabela.length > 0) {
    temDados = true;
  }

  return temDados;
}

function Carregando() {
  return (
    <p>Carregando...</p>
  )
}

const buscaMesAtual = () => {
  const data = new Date();
  const mes = data.getMonth() + 1;
  return mes < 10 ? "0" + mes : mes.toString();
}

function RelatorioEspecialidade({dadosRelatorio, mesRelatorio, anoRelatorio}) {
  console.log(dadosRelatorio);
  return (
    <>
      <CapaEspecialidade especialidades={dadosRelatorio} mes={mesRelatorio} ano={anoRelatorio}/>
      {dadosRelatorio.map((especialidade, index) => (
        (especialidade.resultadosMensais[0].metaMensal > 0) ?
        <CorpoEspecialidade key={index} especialidade={especialidade}/> :
        null
      ))}
    </>
  )
}

function RelatorioCirurgiao({dadosRelatorio, mesRelatorio, anoRelatorio}) {
  console.log(dadosRelatorio);
  return (
    <>
      <CapaCirurgiao cirurgioes={dadosRelatorio} mes={mesRelatorio} ano={anoRelatorio}/>
      {/* {dadosRelatorio.map((especialidade, index) => (
        (especialidade.resultadosMensais[0].metaMensal > 0) ?
        <CorpoEspecialidade key={index} especialidade={especialidade}/> :
        null
      ))} */}
    </>
  )
}