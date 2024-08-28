import { Document, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Chart as ChartJS } from "chart.js";
import { useRef, useState } from "react";
import { MdOutlineFileDownload } from 'react-icons/md';
import { Label } from "../../../../components/ui/label";
import { Switch } from "../../../../components/ui/switch";
import { numeroParaMes } from "../../../../utils/meses";
import { PdfCapaCirurgiao } from "./PdfCapaCirurgiao";
import { PdfCorpoCirurgiao } from './PdfCorpoCirurgiao';
import { CapaCirurgiao } from './capaCirurgiao';
import { CorpoCirurgiao } from './corpoCirurgiao';

export function RelatorioCirurgiao({dadosRelatorio, mesRelatorio, anoRelatorio}) {
  const chartRefCapa = useRef<ChartJS<"bar", number[], string>[]>([]);
  const chartRefCorpo = useRef<ChartJS<"line", number[], string>[]>([]);
  const [base64Image, setBase64Image] = useState([]);
  const [openPdf, setOpenPdf] = useState(false);
  let indexProcedimento = 0;

  const mesString = numeroParaMes(mesRelatorio);

  const gerarPdfReader = () => {
    if (openPdf) {
      setOpenPdf(false);
    } else {
      const newChartRef = [];

      newChartRef.push(chartRefCapa.current[0].toBase64Image());
      newChartRef.push(chartRefCapa.current[1].toBase64Image());

      for (let i = 0; i < chartRefCorpo.current.length; i++) {
        if (chartRefCorpo.current[i] != undefined) {
          newChartRef.push(chartRefCorpo.current[i].toBase64Image());
        }
      }

      setBase64Image(newChartRef);
      setOpenPdf(true);
    }
  }

  return (
    <>
      <div className={`flex flex justify-between w-full px-8`}>
        <div className="w-[150px]"></div>
        <div className="w-[150px]"></div>
        <div className="flex items-center space-x-2 w-[150px] h-[50px] rounded-[5px] flex items-center justify-center">
          <Switch onClick={() => gerarPdfReader()}/>
          <Label>Modo PDF</Label>
        </div>
        {
          openPdf ? 
          <button className={`w-[150px] h-[50px] rounded-[5px] text-white flex items-center justify-start bg-[#337B5B]`} type={"button"}>
            <MdOutlineFileDownload className="w-6 h-6 ml-4"/>
            <div className={"ml-4"}>
              <PDFDownloadLink document={<PdfCirurgiao cirurgioes={dadosRelatorio} mesRelatorio={mesRelatorio} anoRelatorio={anoRelatorio} base64Image={base64Image} mesString={mesString} dadosRelatorio={dadosRelatorio}/>} fileName={"Relatório de Cirurgias - " + mesRelatorio + "-" + anoRelatorio + ".pdf"}>
                Baixar
              </PDFDownloadLink>
            </div>
          </button> : null
        }
      </div>

      <div className={`flex flex-col justify-items-start w-[891px] h-[1260px] mt-8 px-0 ` + (openPdf ? "" : "hidden")}>
        <PDFViewer  style={{height: "100%"}}>
          <PdfCirurgiao cirurgioes={dadosRelatorio} mesRelatorio={mesRelatorio} anoRelatorio={anoRelatorio} base64Image={base64Image} mesString={mesString} dadosRelatorio={dadosRelatorio}/>
        </PDFViewer>
      </div>

      <div className={openPdf ? "hidden" : ""}>
        <CapaCirurgiao cirurgioes={dadosRelatorio} mes={mesRelatorio} ano={anoRelatorio} chartRef={chartRefCapa}/>
        {dadosRelatorio.map(cirurgiao => (
          cirurgiao.procedimentos.map((procedimento, index) => {
            indexProcedimento++
            
            return (
              <CorpoCirurgiao key={index} cirurgiao={cirurgiao} procedimento={procedimento} chartRef={chartRefCorpo} index={indexProcedimento}/> 
            )
          })
        ))}
      </div>
    </>
  )
}

export const PdfCirurgiao = ({ cirurgioes, mesRelatorio, anoRelatorio, base64Image, mesString, dadosRelatorio }) => (
  <Document title={"Relatório de Cirurgias - " + mesRelatorio + "-" + anoRelatorio + ".pdf"} >
    <PdfCapaCirurgiao img={base64Image} mes={mesString} ano={anoRelatorio} cirurgioes={dadosRelatorio}/>
    <PdfCorpoCirurgiao cirurgioes={cirurgioes} img={base64Image}/>
  </Document>
)