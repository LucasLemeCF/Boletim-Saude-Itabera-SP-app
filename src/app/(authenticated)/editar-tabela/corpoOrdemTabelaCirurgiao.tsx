"use client"

import { FaArrowDown, FaArrowUp, FaTrashAlt } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
 
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function LinhasOrdemTabelaCirurgiao({ tabela, control, setValue, register }) {
  let qtdCabecalhosEspecialidade = tabela.cabecalhosEspecialidades.length

  return (
    <div>
      {tabela.cabecalhosCirurgioes.map((cabecalho, indexCabecalho) => {
        return(
          <div className="border border-t-0 border-black" key={indexCabecalho}>
            <LinhaCabecalho cabecalho={cabecalho} key={"cabecalho-"+indexCabecalho} indexCabecalho={indexCabecalho} 
              setValue={setValue} register={register} qtdCabecalhosEspecialidade={qtdCabecalhosEspecialidade}
            />
            {tabela.listaCirurgioes.map((cirurgiao, indexCirurgiao) => {
              return(
                <div key={indexCirurgiao}>
                  {cirurgiao.linhasProcedimentos.map((procedimento, indexProcedimento) => {
                    return(
                      <LinhaTabela key={indexProcedimento} procedimento={procedimento} tabela={tabela} cirurgiao={cirurgiao}
                        control={control} indexLinhaTabela={indexProcedimento} setValue={setValue} 
                      />
                    )
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  )
}

function LinhaCabecalho({cabecalho, indexCabecalho, setValue, register, qtdCabecalhosEspecialidade}) {
  let index = indexCabecalho + qtdCabecalhosEspecialidade

  function onChangeCirurgiao(value) {
    setValue("cabecalhos." + index + ".posicao", cabecalho);
    setValue("cabecalhos." + index + ".tipo", "ESPECIALIDADE_CABECALHO");
    setValue("cabecalhos." + index + ".textos.0.texto", value);
  }

  function onChangeProcedimento(value) {
    setValue("cabecalhos." + index + ".posicao", cabecalho);
    setValue("cabecalhos." + index + ".tipo", "ESPECIALIDADE_CABECALHO");
    setValue("cabecalhos." + index + ".textos.1.texto", value);
  }

  return (
    <div className="flex items-center justify-between divide-x bg-[#E2EFDB]">
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhos.${index}.textos.0.texto`} {...register(`cabecalhos.${Number(index)}.textos.0.texto`)}
        onBlur={(e) => {onChangeCirurgiao(e.target.value)}}
      />
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhos.${index}.textos.1.texto`} {...register(`cabecalhos.${Number(index)}.textos.1.texto`)}
        onBlur={(e) => {onChangeProcedimento(e.target.value)}}
      />
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaArrowUp className="w-[16px] h-[16px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaArrowDown className="w-[16px] h-[16px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaTrashAlt className="w-[16px] h-[16px]"/></p>
      </div>
    </div>
  );
}

function LinhaTabela({procedimento, control, indexLinhaTabela, setValue, tabela, cirurgiao}) {
  function onChange(value) {
    setValue("procedimento." + indexLinhaTabela + ".cirurgiao", procedimento.nomeCirurgiao);
    setValue("procedimento." + indexLinhaTabela + ".procedimento", value);
    setValue("procedimento." + indexLinhaTabela + ".posicao", procedimento.posicao);
    setValue("procedimento." + indexLinhaTabela + ".tipo", "CIRURGIAO_LINHA");
  }

  let procedimentoForm = {
    cirurgiao: procedimento.nomeCirurgiao,
    procedimento: procedimento.nomeProcedimento,
    posicao: procedimento.posicao,
    tipo: "CIRURGIAO_LINHA"
  }

  return(
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={control}
          name={"cirurgiao." + indexLinhaTabela}
          defaultValue={procedimento.nomeCirurgiao}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={procedimento.nomeCirurgiao}>
                <FormControl className="w-[300px] h-6 border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cirurgião" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tabela.listaCirurgioes.map((cirurgiao, indexCirurgiao) => {
                    return(
                      <SelectItem value={cirurgiao.nomeCirurgiao} key={"cirurgiao-"+cirurgiao.posicao+"-"+indexCirurgiao}>
                        {cirurgiao.nomeCirurgiao}
                      </SelectItem>
                    );
                  })} 
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={control}
          name={"procedimento." + indexLinhaTabela}
          defaultValue={procedimentoForm}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={(value) => { field.onChange(value); onChange(value); }} defaultValue={procedimento.nomeProcedimento}>
                <FormControl className="w-[300px] h-6 border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um procedimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cirurgiao.linhasProcedimentos.map((procedimento, indexProcedimento) => {
                    return(
                      <SelectItem value={procedimento.nomeProcedimento} key={"procedimento-"+procedimento.posicao+"-"+indexProcedimento}>
                        {procedimento.nomeProcedimento}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><FaArrowUp className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><FaArrowDown className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><FaTrashAlt className="w-[15px] h-[15px]"/></p>
      </div>
    </div>
  );
}

function calcularLinhaFinal(tabela) {
  let linhaFinal = 0;

  if (tabela.listaCirurgioes !== undefined) {
    tabela.listaCirurgioes.map((cirurgiao) => {
      cirurgiao.linhasProcedimentos.map(() => {
        linhaFinal++;
      });
    });
  }

  linhaFinal += tabela.cabecalhosCirurgioes.length;

  return linhaFinal;
}