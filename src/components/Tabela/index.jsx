import Image from 'next/image';

async function getDadosTabela() {
  const response = await fetch('http://localhost:8080/api/tabela/03-06-2024')

  if (!response.ok) {
    console.log('Erro ao buscar os dados da tabela');
  }

  return response.json()
}

export default async function Tabela() {
  const dadosTabela = await getDadosTabela();

  return (
    <div className="flex flex-col items-center justify-between  border border-black mt-[50px]">
      {header(dadosTabela.data)}
      {corpo(dadosTabela)}
    </div>
  )
}

const header = (data) => {
  return (
    <div>
      {titulo()}
      {headerData(data)}
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

const headerData = (data) => {
  return (
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#337B5B] mt-0">
      <div className="flex items-center justify-center border-black border-t w-[300px] h-[25px]">
        <p className="text-center text-white text-base font-bold leading-6">Data</p>
      </div>

      <div className="flex items-center justify-center border-black w-[300px] h-[25px] ">
        <p className="text-center text-white text-base font-bold leading-6">
          {data}
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

const corpo = (dadosTabela) => {
  return (
    <div className='mt-0'>
      {dadosTabela.especialidadesCabecalhos.map((cabecalho, index) => 
        <div key={index}>
          {cabecalhoEspecialidade(cabecalho)}
        </div>
      )}
    </div>
  )
}

const cabecalhoEspecialidade = (cabecalho) => {
  return (
    <div>
      <div className="flex items-center justify-between divide-x divide-y border-black bg-[#337B5B]">
        <div className="flex items-center justify-between border-black border-t w-[300px] h-[50px] px-1">
          <p className='w-full font-semibold text-center text-white'>{cabecalho.textos[0].texto}</p>
        </div>

        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Pacientes Atendidos</p>
        </div>
        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Meta de Atend.</p>
        </div>
        <div className="flex items-center justify-center border-black text-center text-white w-[100px] h-[50px]">
          <p>%</p>
        </div>

        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Pacientes Atendidos</p>
        </div>
        <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
          <p>Meta de Atend.</p>
        </div>
        <div className="flex items-center justify-center border-black text-center text-white w-[100px] h-[50px]">
          <p>%</p>
        </div>
      </div>

      {cabecalho.especialidades.map((especialidade, index) => 
        <div key={index}>
          {linhaEspecialidade(especialidade)}
        </div>
      )}
    </div>
  )
}

const linhaEspecialidade = (data) => {
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