"use client"

import React, { useEffect, useState } from 'react';
import Cirurgioes from './cirurgioes';
import ConverterData from './converterData';
import Especialidades from './especialidades';
import HeaderTabela from './headerTabela';

export default function Tabela() {
  let [data, setData] = useState(new Date());
  
  return (
    <div className="flex flex-col items-center justify-between  border border-black mt-[50px] bg-[#E2EFDB]">
      <HeaderTabela  
        data={data}
        setData={setData}
      /> 
      <Linhas data={data}/>
    </div>
  )
}

function Linhas({data}) {
  const [dadosTabela, setDadosTabela] = useState(null)
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/tabela/' + ConverterData(data));   
        const dataResponse = await response.json();
        setDadosTabela(dataResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  // console.log('Resultado: ', dadosTabela)

  if (isLoading) return Carregando()

  return (
    <div>
      {TemDadadosEspecialidades({dadosTabela}) ? 
        <Especialidades dadosTabela={dadosTabela}/>
      : null}

      {TemDadadosCirurgioes({dadosTabela}) ? 
        <Cirurgioes dadosTabela={dadosTabela}/>
      : null}

      {!TemDadadosEspecialidades({dadosTabela}) && !TemDadadosCirurgioes({dadosTabela}) ?
        <p>Não foi possível encontrar dados para a data</p>
      : null}
    </div>
  )
}

function TemDadadosEspecialidades({dadosTabela}) {
  let temDados = false;

  dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
    if (cabecalho.especialidades.length > 0) {
      temDados = true;
    }
  });

  return temDados;
}

function TemDadadosCirurgioes({dadosTabela}) {
  let temDados = false;

  dadosTabela.cirurgioesCabecalhos.map((cabecalho) => {
    if (cabecalho.cirurgioes.length > 0) {
      temDados = true;
    }
  });

  return temDados;
}

function Carregando() {
  return (
    <p>Carregando...</p>
  )
}