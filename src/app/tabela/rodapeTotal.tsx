
export function RodapeTotal({dadosTabela, linhasTabela}) {
  const totalDia = somarAtendimentosMes(dadosTabela, linhasTabela);

  return (
    <div className="flex border border-t-0 divide-x border-black bg-[#337B5B] w-full">
      <div className="flex items-center justify-center border-black w-[600px]">
        <p className="font-semibold text-white">Total de Atendimentos + Cirurgias no Mês</p>
      </div>

      <div className="flex items-center justify-center border-black w-[300px]">
        <p className="font-semibold text-white">{totalDia}</p>
      </div>
    </div>
  )
}

function somarAtendimentosMes(dadosTabela, linhasTabela) {
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

  let totalMes = totalDia;

  dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
    cabecalho.especialidades.map((especialidade) => {
      totalMes += especialidade.pacientesAtendidosMes;
      totalMes -= especialidade.pacientesAtendidosDia;
    });
  });

  dadosTabela.cirurgioesCabecalhos.map((cabecalho) => {
    cabecalho.cirurgioes.map((cirurgiao) => {
      if (cirurgiao.procedimento != "Procedimento Anestésico") {
        totalMes += cirurgiao.pacientesAtendidosMes;
        totalMes -= cirurgiao.pacientesAtendidosDia;
      }
    });
  });

  return totalMes;
}