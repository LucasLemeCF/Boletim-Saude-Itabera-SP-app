"use client"

import { useEffect, useRef, useState } from "react";
import { Button } from "../tabela/page";
import { Pagina } from "./corpo";
import { downloadPDF } from "./pdf";

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
  const pdfRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/especialidade');   
        const dataResponse = await response.json();
        setDadosEspecialidades(dataResponse);
        console.log(dataResponse.get(0).especialidade);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return Carregando()

  return (
    <>
      <div className="mt-2">
        <Button texto={"Baixar"} color={"bg-blue-800"} onClick={() => {downloadPDF({pdfRef})}}/>
      </div>
      <div ref={pdfRef} className="flex flex-col items-center justify-between mt-[50px] mb-[25px] w-[891px]"> 
        {dadosEspecialidades.map((especialidade, index) => (
          <Pagina key={index} especialidade={especialidade}/>
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