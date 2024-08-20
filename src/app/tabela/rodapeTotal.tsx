
export function RodapeTotal({dadosTabela, linhasTabela}) {
  const total = somarAtendimentosDia(dadosTabela, linhasTabela);

  return (
    <div className="flex border border-t-0 divide-x border-black bg-[#337B5B] w-full">
      <div className="flex items-center justify-center border-black w-[600px]">
        <p className="font-semibold text-white">Total de Atendimentos + Cirurgias no Mês</p>
      </div>

      <div className="flex items-center justify-center border-black w-[300px]">
        <p className="font-semibold text-white">{total}</p>
      </div>
    </div>
  )
}

function somarAtendimentosDia(dadosTabela, linhasTabela) {
  let totalDia = 0;

  linhasTabela.map((linha) => {
    if (!Number.isNaN(linha.pacientesAtendidos) && linha.tipo === "ESPECIALIDADE_LINHA") {
      totalDia += linha.pacientesAtendidos;
    }
  });

  dadosTabela.cirurgioesCabecalhos.map((cabecalho) => {
    cabecalho.cirurgioes.map((cirurgiao) => {
      if (cirurgiao.procedimento != "Procedimento Anestésico") {
        linhasTabela.map((linha) => {
          if (!Number.isNaN(linha.pacientesAtendidos) && linha.posicao === cirurgiao.posicao) {
            totalDia += linha.pacientesAtendidos;
          }
        });
      }
    });
  });

  return totalDia;
}