"use client"

import Image from 'next/image';
import { DatePickerDemo } from "./calendario";

export default function HeaderTabela({data, setData}) {
    return (
      <div>
        {Titulo()}
        {HeaderData({data, setData})}
      </div>
    )
  }
  
  function Titulo() {
    return (
      <div className="flex items-center justify-between divide-x divide-y border-black bg-[#337B5B]">
        <div className="flex items-center border-black w-[300px] h-[75px] px-2 gap-4">
          <Image 
            src="/logo.png"
            width={60}
            height={60}
            alt="Logo Itaberá SP"
          />
          <div>
            <p className="text-white text-[11px] font-impact">
              Prefeitura Municipal de
            </p>
            <p className="text-white text-[38px] leading-8 font-impact mt-0  ">
              ITABERÁ
            </p>
          </div>
        </div>
  
        <div className="flex items-center justify-center border-black w-[300px] h-[75px] ">
          <p className="text-white text-2xl font-impact">
            BOLETIM MÉDICO DIÁRIO
          </p>
        </div>
  
        <div className="flex items-center justify-end border-black w-[300px] h-[75px] px-2 gap-4">  
          <p className="text-white text-center text-xl font-impact w-[175px]">
            SECRETARIA MUNICIPAL DE SAÚDE
          </p>
          <Image 
            src="/logo-saude.png"
            width={65}
            height={65}
            alt="Logo da secretaria de saúde"
          />
        </div>
      </div>
    ) 
  }
  
  function HeaderData({data, setData}) {

    return (
      <div className="flex items-center justify-between divide-x divide-y border-black bg-[#337B5B] mt-0">
        <div className="flex items-center justify-center border-black border-t w-[300px] h-[25px]">
          <p className="text-center text-white text-base font-bold leading-6">Data</p>
        </div>
  
        <div className="flex items-center justify-center border-black w-[300px] h-[25px] ">
            <DatePickerDemo
              data={data}
              setData={setData}
            />
        </div>
  
        <div className="flex items-center justify-center border-black w-[300px] h-[25px] px-2 gap-4">  
          <p className="text-center text-white text-base font-bold leading-6">
            Resultado Mensal
          </p>  
        </div>
      </div>
    )
  
  }