"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { dadosEspecialidadeSchema, EspecialidadeFormData } from "../../../schemas/responseEspecialidade";
import { DialogCloseButton } from './cadastrarEspecialidade';

export default function Tabela() {
  const { data: session } = useSession();
  const [data, setData] = useState(new Date());
  
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">
      <div className="flex flex-col items-center justify-between pt-[50px] pb-[25px]">
        <div className="flex flex-col items-center justify-between mt-0 mb-0 border-collapse">
          {
            session ?
            <ConteudoTabela dataCalendario={data} setData={setData} session={session}/>
            : CarregandoSession()
          }
        </div>
      </div>
    </main>
  )
}

function ConteudoTabela({dataCalendario, setData, session}) {
  const [dadosTabela, setDadosTabela] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm<EspecialidadeFormData>({
    resolver: zodResolver(dadosEspecialidadeSchema),
    defaultValues: {  
      especialidade: "",
      medico: "",
      metaDiaria: 0,
      metaMensal: 0,
    }
});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + '/api/especialidade', {
          method: "GET",
          headers: {
            authorization: session?.user.token,
          },
        }); 
        const dataResponse = await response.json();
        setDadosTabela(dataResponse);
        // console.log(dataResponse)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataCalendario, session?.user.token]);

  if (isLoading) return Carregando();

  return (
    <div className="">
      {CabecalhoEspecialidade({register, handleSubmit, session, setLoading})}
      <table className="flex mt-4 flex-col border border-collapse border-black/20 rounded-[5px] overflow-hidden">
        {CabecalhoTabela()}
        {CorpoTabela({dadosTabela})}
      </table>
    </div>
  )
}

function CabecalhoEspecialidade({register, handleSubmit, session, setLoading}) {
  return (
    <div className="w-full flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">Especialidades</h1>
        <div>Consulte as especilidades da plataforma</div>
      </div>
      <div>
        {DialogCloseButton({register, handleSubmit, session, setLoading})}
      </div>
    </div>
  )
}

function CabecalhoTabela() {
  return (
    <thead className="w-full flex justify-between bg-[#337B5B] overflow-hidden">
      <div className="py-2 flex">
        <p className="w-[300px] overflow-hidden border-black text-white flex justify-center">Especialidade</p>
        <p className="w-[300px] border-black text-white flex justify-center">Médico</p>
        <p className="w-[150px] border-black text-white flex justify-center">Meta Diária</p>
        <p className="w-[150px] border-black text-white flex justify-center">Meta Mensal</p>
        <p className="w-[100px] border-black text-white flex justify-center">Editar</p>
        <p className="w-[100px] border-black text-white flex justify-center">Excluir</p>
      </div>
    </thead>
  )
}

function CorpoTabela({dadosTabela}) {
  return (
    <tbody>
      {dadosTabela.map(field => {
        return(
          <tr className="flex">
            <td className="w-[300px] border-t border-black/20 ml-1">{field.especialidade}</td>
            <td className="w-[300px] border-t border-black/20">{field.medicoAtual}</td>
            <td className="w-[150px] border-t border-black/20 flex justify-center">{field.metaDiariaAtual}</td>
            <td className="w-[150px] border-t border-black/20 flex justify-center">{field.metaMensalAtual}</td>
            <td className="w-[100px] border-t border-black/20 flex justify-center items-center"><FaEdit/></td>
            <td className="w-[100px] border-t border-black/20 flex justify-center items-center"><FaTrashAlt/></td>
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