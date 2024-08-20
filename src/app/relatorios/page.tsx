"use client"

import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import generatePDF, { Options, usePDF } from "react-to-pdf";
import { Form } from "../../components/ui/form";
import { RelatorioFormData } from '../../schemas/relatorio';
import { Button } from "../tabela/page";
import { RelatorioCirurgiao } from "./cirurgiao/relatorioCirurgiao";
import { RelatorioEspecialidade } from './especialidade/relatorioEspecialidade';
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
  const { control, handleSubmit } = useForm<RelatorioFormData>({});

  const form = useForm<RelatorioFormData>({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/' + tipoRelatorio + '/' + mesRelatorio + '-' + anoRelatorio);
        const dataResponse = await response.json();
        setDadosRelatorio(dataResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [anoRelatorio, mesRelatorio, tipoRelatorio]);

  if (isLoading) return Carregando()

  const montarNomeDoArquivo = () => {
    let resultato = "";

    if (tipoRelatorio == "especialidade") {
      resultato = "Relatório Médico - " + mesRelatorio + "-" + anoRelatorio + ".pdf";
    } else if (tipoRelatorio == "cirurgiao") {
      resultato = "Relatório de Cirurgias - " + mesRelatorio + "-" + anoRelatorio + ".pdf";
    }
    
    return resultato;
  }

  const options: Options = {
    filename: montarNomeDoArquivo(),
  };

  const downloadPdf = () => generatePDF(targetRef, options);

  async function onSubmit(dadosNovos: RelatorioFormData) {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/' + dadosNovos.tipo + '/' + dadosNovos.mes + '-' + dadosNovos.ano);   
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
      <form className="flex justify-between w-[891px] mt-8 p-8 rounded-[5px] bg-[#337B5B]">
        <SelectTipoRelatorio control={control}/>
        <SelectMonth control={control}/>
        <SelectYear control={control}/>
        <Button texto={"Gerar Gráfico"} color={"bg-blue-800 border border-black"} onClick={handleSubmit(onSubmit)} type={"button"}/>
      </form>
      {
        TemDadados(dadosRelatorio) ? 
        <div ref={targetRef} className="flex flex-col items-center justify-between my-8 w-[891px]"> 
          {tipoRelatorio == "especialidade" ?
            <RelatorioEspecialidade dadosRelatorio={dadosRelatorio} mesRelatorio={mesRelatorio} anoRelatorio={anoRelatorio}/>
            : tipoRelatorio == "cirurgiao" ?
            <RelatorioCirurgiao dadosRelatorio={dadosRelatorio} mesRelatorio={mesRelatorio} anoRelatorio={anoRelatorio}/>
            : 
            <p>Tipo de relatório não encontrado</p>
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