
export function RodapeCirurgioes({dadosTabela, linhasTabela}) {
  const totalDia = somarAtendimentosDia(dadosTabela, linhasTabela);
  const totalMes = somarAtendimentosMes(dadosTabela) + totalDia;
  const totalAno = somarAtendimentosAno(dadosTabela) + totalDia;

  return (
    <div className="flex border border-t-0 divide-x border-black bg-[#337B5B] w-full">
      <div className="flex items-center justify-center border-black w-[600px]">
        <p className="font-semibold text-white">Total de Cirurgias</p>
      </div>

      <div className="flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalDia}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalMes}</p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalAno}</p>
      </div>
    </div>
  )
}

function somarAtendimentosDia(dadosTabela, linhasTabela) {
  let totalDia = 0;

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

function somarAtendimentosMes(dadosTabela) {
  let totalMes = 0;

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

function somarAtendimentosAno(dadosTabela) {
  let totalAno = 0;

  dadosTabela.cirurgioesCabecalhos.map((cabecalho) => {
    cabecalho.cirurgioes.map((cirurgiao) => {
      if (cirurgiao.procedimento != "Procedimento Anestésico") {
        totalAno += cirurgiao.pacientesAtendidosAno;
        totalAno -= cirurgiao.pacientesAtendidosDia;
      }
    });
  });

  return totalAno;
}