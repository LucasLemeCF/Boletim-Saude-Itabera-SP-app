export default function Especialidade({ dadosTabela }) {
    return (
      <div className='mt-0'>
        {dadosTabela.cirurgioesCabecalhos.map((cabecalho, index) => 
          <div key={index}>
            {cabecalhoCirurgioes(cabecalho)}
          </div>
        )}
      </div>
    )
  }
  
  const cabecalhoCirurgioes = (cabecalho) => {
    return (
      <div>
        <div className="flex items-center justify-between divide-x divide-y border-black bg-[#337B5B]">
          <div className="flex items-center justify-between border-black border-t w-[300px] h-[50px] px-1">
            <p className='w-full font-semibold text-center text-white'>{cabecalho.textos[0].texto}</p>
          </div>

          <div className="flex items-center justify-between border-black border-t w-[300px] h-[50px] px-1">
            <p className='w-full font-semibold text-center text-white'>{cabecalho.textos[1].texto}</p>
          </div>
  
          <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
            <p>Diário</p>
          </div>
          <div className="flex items-center justify-center border-black font-semibold text-center text-white w-[100px] h-[50px]">
            <p>Mensal</p>
          </div>
          <div className="flex items-center justify-center border-black text-center text-white w-[100px] h-[50px]">
            <p>Anual</p>
          </div>
        </div>
  
        {cabecalho.cirurgioes.map((cirurgiao, index) => 
          <div key={index}>
            {linhaCirurgiao(cirurgiao)}
          </div>
        )}
      </div>
    )
  }
  
  const linhaCirurgiao = (cirurgiao) => {
    return (
      <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
        <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px] px-1">
          <p>{cirurgiao.cirurgiao}</p>
        </div>
  
        <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px] px-1">
          <p>{cirurgiao.procedimento}</p>
        </div>

        <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
          <p>{cirurgiao.pacientesAtendidosDia}</p>
        </div>

        <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
          <p>{cirurgiao.pacientesAtendidosMes}</p>
        </div>

        <div className="flex items-center justify-center border-black w-[100px] h-[25px]">
          <p>{cirurgiao.pacientesAtendidosAno}</p>
        </div>
      </div>
    )
  }
  
  const calcularPorcentagem = (atendidos, meta) => {
    return (atendidos / meta * 100).toFixed(1)
  }