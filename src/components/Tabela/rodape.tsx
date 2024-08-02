import React from "react";
import { calcularPorcentagem } from "./especialidades";

export function Rodape({dadosTabela}) {
    const totalDia = somarAtendimentosDia(dadosTabela);
    const totalMetaDia = somarMetaDia(dadosTabela);
    const totalAtingidoDia = calcularPorcentagem(totalDia, totalMetaDia);

    const totalMes = somarAtendimentosMes(dadosTabela);
    const totalMetaMes = somarMetaMes(dadosTabela);
    const totalAtingidoMes = calcularPorcentagem(totalMes, totalMetaMes);

    return (
      <div className="flex border border-t-0 divide-x border-black bg-[#337B5B] w-full">
        <div className="flex items-center justify-center border-black w-[300px]">
          <p className="font-semibold text-white">Total</p>
        </div>
  
        <div className="flex items-center justify-center border-black w-[100px]">
          <p className="font-semibold text-white">{totalDia}</p>
        </div>
        <div className="flex items-center justify-center border-black w-[100px]">
          <p className="font-semibold text-white">{totalMetaDia}</p>
        </div>
        <div className="flex items-center justify-center border-black w-[100px]">
          <p className="font-semibold text-white">{totalAtingidoDia}%</p>
        </div>
  
        <div className="flex items-center justify-center border-black w-[100px]">
          <p className="font-semibold text-white">{totalMes}</p>
        </div>
        <div className="flex items-center justify-center border-black w-[100px]">
          <p className="font-semibold text-white">{totalMetaMes}</p>
        </div>
        <div className="flex items-center justify-center border-black w-[100px]">
          <p className="font-semibold text-white">{totalAtingidoMes}%</p>
        </div>
      </div>
    )
}

function somarAtendimentosDia(dadosTabela) {
  let totalDia = 0;

  dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
    cabecalho.especialidades.map((especialidade) => {
      totalDia += especialidade.pacientesAtendidosDia;
    });
  });

  return totalDia;
}
  
function somarMetaDia(dadosTabela) {
    let totalMetaDia = 0;

    console.log("Teste: ");
    console.log(JSON.stringify(dadosTabela));
    
    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
        cabecalho.especialidades.map((especialidade) => {
            totalMetaDia += especialidade.metaDiaria;
        });
    });
    
    return totalMetaDia;
}

function somarAtendimentosMes(dadosTabela) {
    let totalMes = 0;

    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
        cabecalho.especialidades.map((especialidade) => {
            totalMes += especialidade.pacientesAtendidosMes;
        });
    });

    return totalMes;
}

function somarMetaMes(dadosTabela) {
    let totalMetaMes = 0;

    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
        cabecalho.especialidades.map((especialidade) => {
            totalMetaMes += especialidade.metaMensal;
        });
    });

    return totalMetaMes;
}