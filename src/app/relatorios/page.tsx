"use client"

import { useEffect, useRef, useState } from "react";
import generatePDF, { Options, usePDF } from "react-to-pdf";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../tabela/page";
import { Capa } from "./capa";
import { Pagina } from "./corpo";

export default function Relatorio() {
  return (
    <div className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">  
      <Paginas/>
    </div>
  );
}

function Paginas() {
  const [dadosEspecialidades, setDadosEspecialidades] = useState(null)
  const [isLoading, setLoading] = useState(true);

  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const pdfRef = useRef(null);

  const mesRelatorio = "06";
  const anoRelatorio = "2024"

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
  }, []);

  if (isLoading) return Carregando()

  const options: Options = {
    filename: "Relatório Médico - " + mesRelatorio + "-" + anoRelatorio + ".pdf",
  };

  const downloadPdf = () => generatePDF(targetRef, options);

  return (
    <>
      <div className="flex justify-between w-[891px] mt-2">
        <Button texto={"Baixar"} color={"bg-blue-800"} onClick={() => downloadPdf()}/>
        <div className="w-32">
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="sveltekit">SvelteKit</SelectItem>
              <SelectItem value="astro">Astro</SelectItem>
              <SelectItem value="nuxt">Nuxt.js</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div ref={targetRef} className="flex flex-col items-center justify-between mt-[50px] mb-[25px] w-[891px]"> 
        <Capa especialidades={dadosEspecialidades} mes={mesRelatorio} ano={anoRelatorio}/>
        {dadosEspecialidades.map((especialidade, index) => (
          (especialidade.resultadosMensais[0].metaMensal > 0) ?
          <Pagina key={index} especialidade={especialidade}/> :
          null
        ))}
      </div>
    </>
  );
}

function Carregando() {
  return (
    <p>Carregando...</p>
  )
}