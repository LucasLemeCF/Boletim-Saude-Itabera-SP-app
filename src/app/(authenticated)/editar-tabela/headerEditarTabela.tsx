/* eslint-disable @next/next/no-img-element */
"use client"

import { DatePickerDemo } from "../../../schemas/calendario";

export default function HeaderEditarTabela({data, setData}) {
    return (
      <div className='bg-[#E2EFDB]'>
        {Titulo()}
        {HeaderData({data, setData})}
      </div>
    )
  }
  
  function Titulo() {
    return (
      <div className="flex items-center justify-between divide-x border-t border-x border-black bg-[#337B5B]">
        <div className="flex items-centerflex items-center justify-start border-b-0 border-black w-[200px] h-[75px] px-2 gap-4">
          <img 
            src="/logo.png"
            width="60px"
            height="60px"
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
  
        <div className="flex items-center justify-center border-black w-[400px] h-[75px]">
          <p className="text-white text-2xl font-impact">
            BOLETIM MÉDICO DIÁRIO
          </p>
        </div>
      </div>
    ) 
  }
  
  function HeaderData({data, setData}) {
    return (
      <div className="flex items-center justify-between divide-x border border-black bg-[#337B5B] mt-0">
        <div className="flex items-center justify-center border-black w-[300px] h-[25px]">
          <p className="text-center text-white text-base font-bold leading-6">Data</p>
        </div>
  
        <div className="flex items-center justify-center border-black border-collapse w-[400px] h-[25px] ">
            <DatePickerDemo
              data={data}
              setData={setData}
            />
        </div>
      </div>
    )
  }