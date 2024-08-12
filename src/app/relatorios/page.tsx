"use client"

import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import generatePDF, { Options, usePDF } from "react-to-pdf";
import {
  Form
} from "../../components/ui/form";
import { RelatorioFormData } from '../../schemas/relatorio';
import { Button } from "../tabela/page";
import { Capa } from "./capa";
import { Pagina } from "./corpo";
import { SelectMonth, SelectTipoRelatorio, SelectYear } from "./select";

export default function Relatorio() {
  return (
    <div className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">  
      <Paginas/>
    </div>
  );
}

function Paginas() {
  const [dadosEspecialidades, setDadosEspecialidades] = useState(null)
  const [mesRelatorio, setMesRelatorio] = useState(buscaMesAtual());
  const [anoRelatorio, setAnoRelatorio] = useState("2024");
  const [isLoading, setLoading] = useState(true);

  const { targetRef } = usePDF({filename: 'page.pdf'});
  
  const { control, handleSubmit, register } = useForm<RelatorioFormData>({
  });

  const form = useForm<RelatorioFormData>({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/especialidade/' + mesRelatorio + '-' + anoRelatorio);   
        const dataResponse = await response.json();
        setDadosEspecialidades(dataResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [anoRelatorio, mesRelatorio]);

  if (isLoading) return Carregando()

  const options: Options = {
    filename: "Relatório Médico - " + mesRelatorio + "-" + anoRelatorio + ".pdf",
  };

  const downloadPdf = () => generatePDF(targetRef, options);

  async function onSubmit(dadosNovos: RelatorioFormData) {
    console.log("Tipo: " + dadosNovos.tipo + " Data: " + dadosNovos.mes + "-" + dadosNovos.ano);
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
        TemDadados(dadosEspecialidades) ? 
        <div ref={targetRef} className="flex flex-col items-center justify-between mt-[50px] mb-[25px] w-[891px]"> 
          <Capa especialidades={dadosEspecialidades} mes={mesRelatorio} ano={anoRelatorio}/>
          {dadosEspecialidades.map((especialidade, index) => (
            (especialidade.resultadosMensais[0].metaMensal > 0) ?
            <Pagina key={index} especialidade={especialidade}/> :
            null
          ))}
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