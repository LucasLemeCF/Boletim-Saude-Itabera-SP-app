import Image from 'next/image';
import { mockData } from './mockData';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC]">
      <div className="flex flex-col items-center justify-between">
        {tabela()}
        {botoes()}
      </div>
    </main>
  );
}

const tabela = () => {
  return (
    <div className="flex flex-col items-center justify-between divide-y border border-black mt-[50px]">
      {header()}
      {corpo()}
    </div>
  )
}

const header = () => {
  return (
    <div>
      {titulo()}
      {headerData()}
    </div>
  )
}

const titulo = () => {
  return (
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#337B5B]">
      <div className="flex items-center border-black w-[300px] h-[75px] px-2 gap-4">
        <Image 
          src="/logo.png"
          width={60}
          height={60}
          alt="Logo Itaberá SP"
        />
        <Image 
            src="/logo-texto.png"
            width={100}
            height={50}
            alt="Prefeiura Municipal de Itaberá SP"
        />
      </div>

      <div className="flex items-center justify-center border-black w-[300px] h-[75px] ">
        <p className="text-white font-bold">
          BOLETIM MÉDICO DIÁRIO
        </p>
      </div>

      <div className="flex items-center justify-end border-black w-[300px] h-[75px] px-2 gap-4">  
        <p className="text-white text-center font-bold w-[175px]">
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

const headerData = () => {
  return (
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#337B5B]">
      <div className="flex items-center justify-center border-black border-t w-[300px] h-[25px]">
        <p className="text-center text-white text-base font-bold leading-6">Data</p>
      </div>

      <div className="flex items-center justify-center border-black w-[300px] h-[25px] ">
        <p className="text-center text-white text-base font-bold leading-6">
          23/07/2024
        </p>
      </div>

      <div className="flex items-center justify-center border-black w-[300px] h-[25px] px-2 gap-4">  
        <p className="text-center text-white text-base font-bold leading-6">
          Resultado Mensal
        </p>  
      </div>
    </div>
  )

}

const corpo = () => {
  return (
    <div>
      {mockData.especialidades.map((data, index) => 
        <div key={index}>
          {linha(data)}
        </div>
      )}
    </div>
  )
}

const linha = (data) => {
  return (
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px] px-1">
        <p>{data.especialidade}</p>
      </div>

      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{data.pacientesAtendidosDia}</p>
      </div>
      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{data.metaDiaria}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{calcularPorcentagem(data.pacientesAtendidosDia, data.metaDiaria)}%</p>
      </div>

      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{data.pacientesAtendidosMes}</p>
      </div>
      <div className="flex items-center justify-center border-black font-semibold w-[100px] h-[25px]">
        <p>{data.metaMensal}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
        <p>{calcularPorcentagem(data.pacientesAtendidosMes, data.metaMensal)}%</p>
      </div>
    </div>
  )
}

const calcularPorcentagem = (atendidos, meta) => {
  return (atendidos / meta * 100).toFixed(1)
}

const botoes = () => {
  return (
    <div className="flex items-center justify-between">
    </div>
  )
}