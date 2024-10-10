"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useTransition } from "react";
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { LoginSchema } from '../../../schemas/login';

export default function Login() {
  return ( 
    <div className="bg-white w-[540px] px-[72px] py-12 rounded-[20px] flex flex-col items-center justify-between shadow-[6px_6px_8px_0_rgba(0,0,0,0.25)]">
      <Logo/>
      <FormLogin/>
    </div>
  )
}

const Logo = () => (
  <div className="flex items-center justify-between">
    <Image 
      src="/logo.png"
      width={75}
      height={75}
      alt="Logo Itaberá SP"
      className="mr-4"
    />
    <Image 
      src="/logo-texto-verde.png"
      width={191}
      height={75}
      alt="Prefeitura Municipal de Itaberá"
    />
  </div>
)

function FormLogin () {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>> ({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      usuario: '',
      senha: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      const data = {
        usuario: values.usuario,
        senha: values.senha
      }
  
      signIn('credentials', {
          ...data,
          callbackUrl: '/tabela',
      })
    });
  }

  return  (
    <div className="w-full mt-8">
      <Form  {...form}>
        <form onSubmit={form.handleSubmit((onSubmit))}>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="usuario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <input 
                      className="bg-white w-full h-12 py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
                      {...field}
                      disabled={isPending}
                      type="text" 
                      placeholder="Digite o nome do usuário"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <input 
                      className="bg-white w-full h-12 py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
                      {...field}
                      disabled={isPending}
                      type="password" 
                      placeholder="Digite a senha"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500"/>
                </FormItem>
              )}
            />
          </div>
          <div className="bg-[#337B5B] w-full h-[50px] mt-8 rounded-[8px] flex items-center hover:bg-[#2f7052]">
            <button 
              className="w-full text-white flex items-center justify-center"
              disabled={isPending}
              type="submit"
            >
              {isPending ? 
                <div className="flex flex-row items-center">
                  <CgSpinner className="animate-spin text-white text-center h-5 w-5 mr-1"/>
                  <p>Carregando...</p>
                </div>
                : 
                'Entrar'
              }
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}