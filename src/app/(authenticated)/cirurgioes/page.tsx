"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { CirurgiaoFormData, dadosCirurgiaoSchema } from "../../../schemas/responseCirurgiao";
import { CardAdicionarCirurgiao } from './cadastrarCirurgiao';

export default function Tabela() {
  const { data: session } = useSession();
  
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">
      <div className="flex flex-col items-center justify-between pt-[50px] pb-[25px]">
        <div className="flex flex-col items-center justify-between mt-0 mb-0 border-collapse">
          {
            session ?
            <ConteudoTabela session={session}/>
            : CarregandoSession()
          }
        </div>
      </div>
    </main>
  )
}

function ConteudoTabela({session}) {
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
        const response = await fetch(process.env.NEXT_PUBLIC_API + '/api/cirurgiao', {
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
      {CabecalhoCirurgiao({register, handleSubmit, session, setLoading, fetchData})}
      <table className="flex mt-4 flex-col border border-collapse border-black/20 rounded-[5px] overflow-hidden">
        {CabecalhoTabela()}
        {
          dadosTabela != null ?
          CorpoTabela({dadosTabela, register, handleSubmit, session, setLoading, fetchData, reset})
          : <div className="flex justify-center items-center h-40">Erro ao carregar os dados</div>
        }
      </table>
    </div>
  )
}

function CabecalhoCirurgiao({register, handleSubmit, session, setLoading, fetchData}) {
  return (
    <div className="w-full flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">Cirurgiões</h1>
        <div>Consulte os cirurgiões da plataforma</div>
      </div>
      <div>
        {CardAdicionarCirurgiao({register, handleSubmit, session, setLoading, fetchData})}
      </div>
    </div>
  )
}

function CabecalhoTabela() {
  return (
    <thead className="w-full flex justify-between bg-[#337B5B] overflow-hidden">
      <div className="py-2 flex">
        <p className="w-[300px] overflow-hidden border-black text-white flex justify-center">Cirurgião</p>
        <p className="w-[100px] border-black text-white flex justify-center">Visualizar</p>
        <p className="w-[100px] border-black text-white flex justify-center">Editar</p>
        <p className="w-[100px] border-black text-white flex justify-center">Excluir</p>
      </div>
    </thead>
  )
}

function CorpoTabela({dadosTabela, register, handleSubmit, session, setLoading, fetchData, reset}) {
  return (
    <tbody>
      {dadosTabela.map(field => {
        return(
          <tr className="flex">
            <td className="w-[300px] border-t border-black/20 ml-1">{field.nome}</td>
            <td className="w-[100px] border-t border-black/20 flex justify-center items-center hover:cursor-pointer hover:text-[#337B5B] hover:bg-green-50">
              <FaEye/>
            </td>
            <td className="w-[100px] border-t border-black/20 flex justify-center items-center hover:cursor-pointer hover:text-yellow-600 hover:bg-yellow-50">
              <FaEdit/>
              {/* {CardEditarEspecialidade({register, handleSubmit, session, setLoading, fetchData, field, reset})} */}
            </td>
            <td className="w-[100px] border-t border-black/20 flex justify-center items-center hover:cursor-pointer hover:text-red-600 hover:bg-red-50">
              <FaTrashAlt/>
              {/* {CardExcluirEspecialidade({handleSubmit, session, setLoading, fetchData, field})} */}
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