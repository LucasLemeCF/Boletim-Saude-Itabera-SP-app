"use client"

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from "react";
import { Button } from "../tabela/page";

const downloadPDF = ({pdfRef}) => {
  const input = pdfRef.current;
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      const doc = new jsPDF('p', 'mm', 'a4', true);
      let position = 0;
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Relatório.pdf');
    });
}

export default function Relatorio() {
  return (
    <div className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">  
      <Paginas/>
    </div>
  );
}

function Paginas() {
  const pdfRef = useRef(null);

  return (
    <>
      <div className="mt-2">
        <Button texto={"Baixar"} color={"bg-blue-800"} onClick={() => {downloadPDF({pdfRef})}}/>
      </div>
      <div ref={pdfRef} className="flex flex-col items-center justify-between mt-[50px] mb-[25px] w-[840px]"> 
        <Pagina cor={"bg-blue-800"}/>
        <Pagina cor={"bg-green-800"}/>
        <Pagina cor={"bg-red-800"}/>
      </div>
    </>
  );
}

function Pagina({cor}) {
  return (
    <div className={`flex flex-col items-center justify-between border border-4 border-red-800 w-[840px] h-[1188px] ${cor}`}> 
       
    </div>
  );
}