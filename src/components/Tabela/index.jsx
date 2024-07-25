import HeaderTabela from './headerTabela';

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
      <HeaderTabela data={dadosTabela.data}/>
      {corpo(dadosTabela)}
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