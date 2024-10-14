"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { CirurgiaoFormData, dadosCirurgiaoSchema } from '../../../../schemas/responseCirurgiao';
import { CardAdicionarProcedimento } from './cadastrarProcedimento';

export default function Tabela({ params }) {
  const { data: session } = useSession();
  
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">
      <div className="flex flex-col items-center justify-between pt-[50px] pb-[25px]">
        <div className="flex flex-col items-center justify-between mt-0 mb-0 border-collapse">
          {
            session ?
            <ConteudoTabela session={session} cirurgiaoId={params.cirurgiaoId}/>
            : CarregandoSession()
          }
        </div>
      </div>
    </main>
  )
}

function ConteudoTabela({session, cirurgiaoId}) {
  const [dadosTabela, setDadosTabela] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const { register, handleSubmit, reset } = useForm<CirurgiaoFormData>({
    resolver: zodResolver(dadosCirurgiaoSchema),
    defaultValues: {  
      nome: "",
    }
  });

  const fetchData = async () => {
    if (session) {
      setLoading(true);
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + '/api/procedimentoCirurgiao/' + cirurgiaoId, {
          method: "GET",
          headers: {
            authorization: session?.user.token,
          },
        }); 
        const dataResponse = await response.json();
        setDadosTabela(dataResponse);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user.token]);

  if (isLoading) return Carregando();

  return (
    <div className="">
       {
        dadosTabela != null ?
        <>
          {CabecalhoProcedimentoCirurgiao({register, handleSubmit, session, setLoading, fetchData, dadosTabela, cirurgiaoId})}
          <table className="flex mt-4 flex-col border border-collapse border-black/20 rounded-[5px] overflow-hidden">
            {CabecalhoTabela()}
            {CorpoTabela({dadosTabela, register, handleSubmit, session, setLoading, fetchData, reset})}
          </table>
        </>
        : <div className="flex justify-center items-center h-40">Erro ao carregar os dados</div>
      }
    </div>
  )
}

function CabecalhoProcedimentoCirurgiao({register, handleSubmit, session, setLoading, fetchData, dadosTabela, cirurgiaoId}) {
  console.log(dadosTabela)

  return (
    <div className="w-full flex justify-between">
      <div>
        <h1 className="text-xl font-bold">Procedimentos - {dadosTabela.nomeCirurgiao}</h1>
        <div>Consulte os procedimentos do cirurgião</div>
      </div>
      <div>
        {CardAdicionarProcedimento({register, handleSubmit, session, setLoading, fetchData, cirurgiaoId})}
      </div>
    </div>
  )
}

function CabecalhoTabela() {
  return (
    <thead className="w-full flex justify-between bg-[#337B5B] overflow-hidden">
      <div className="py-2 flex">
        <p className="w-[400px] overflow-hidden border-black text-white flex justify-center">Procedimento</p>
        <p className="w-[100px] border-black text-white flex justify-center">Editar</p>
        <p className="w-[100px] border-black text-white flex justify-center">Excluir</p>
      </div>
    </thead>
  )
}

function CorpoTabela({dadosTabela, register, handleSubmit, session, setLoading, fetchData, reset}) {
  return (
    <tbody>
      {dadosTabela.procedimentos.map(field => {
        return(
          <tr className="flex">
            <td className="w-[400px] border-t border-black/20 ml-1">{field.nome}</td>
            <td className="w-[100px] border-t border-black/20 flex justify-center items-center hover:cursor-pointer hover:text-yellow-600 hover:bg-yellow-50">
              <FaEdit/>
              {/* {CardEditarCirurgiao({register, handleSubmit, session, setLoading, fetchData, field, reset})} */}
            </td>
            <td className="w-[100px] border-t border-black/20 flex justify-center items-center hover:cursor-pointer hover:text-red-600 hover:bg-red-50">
              <FaTrashAlt/>
              {/* {CardExcluirCirurgiao({handleSubmit, session, setLoading, fetchData, field})} */}
            </td>
          </tr>
        ) 
      })}
    </tbody>
  )
}

function CarregandoSession() {
  return (
    <div className="bg-[#337B5B] w-40 h-16 border rounded-[5px] text-white flex items-center justify-center">
      <CgSpinner className="animate-spin h-5 w-5 mr-1"/>
      <p>Carregando...</p>
    </div>
  )
}

function Carregando() {
  return (<div></div>)
}