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

export default function LinhasOrdemTabelaEspecialidade({ tabela, control, setValue, register, watch }) {
  const tamanhoCabecalho = tabela.cabecalhosEspecialidades.length;
  let indexLinha = -1;

  return (
    <div>
      {tabela.cabecalhosEspecialidades.map((cabecalho, indexCabecalho) => {
        return(
          <div className="border border-t-0 border-black" key={indexCabecalho}>
            <LinhaCabecalho register={register} indexCabecalho={indexCabecalho} setValue={setValue} watch={watch}/>
            {tabela.linhasEspecialidades.map((linha, indexLinhaTabela) => { 
              const linhaInicial = tabela.cabecalhosEspecialidades[indexCabecalho].posicao + 1;
              let linhaAtual = linhaInicial + indexLinhaTabela;

              let linhaFinal;
              if (tamanhoCabecalho > indexCabecalho + 1) {
                linhaFinal = tabela.cabecalhosEspecialidades[indexCabecalho + 1].posicao - 1;
              } else {
                linhaFinal = tabela.linhasEspecialidades.length + tamanhoCabecalho;
              }

              if (linhaAtual <= linhaFinal) {
                indexLinha++;

                return(
                  <LinhaTabela key={indexLinhaTabela} tabela={tabela} linha={tabela.linhasEspecialidades[indexLinha]} 
                    control={control} setValue={setValue} indexLinha={indexLinha}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </div>
  )
}

function LinhaCabecalho({ register, indexCabecalho, setValue, watch }) {
  function onChange(value) {
    setValue("cabecalhos." + indexCabecalho + ".posicao", indexCabecalho);
    setValue("cabecalhos." + indexCabecalho + ".tipo", "ESPECIALIDADE_CABECALHO");
    setValue("cabecalhos." + indexCabecalho + ".textos.0.texto", value);
  }

  console.log("Teste: ");
  console.log(watch);

  return (
    <div className="flex items-center justify-between divide-x bg-[#E2EFDB]">
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhos.${indexCabecalho}.textos.0.texto`} {...register(`cabecalhos.${Number(indexCabecalho)}.textos.0.texto`)}
        onBlur={(e) => {onChange(e.target.value)}}
      />
      <div className="flex items-center justify-between border-black bg-[#337B5B] w-[300px] h-[25px]"></div>
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

function LinhaTabela({linha, tabela, control, setValue, indexLinha}) {
  function onChange(value) {
    setValue("especialidade." + indexLinha + ".especialidade", value);
    setValue("especialidade." + indexLinha + ".posicao", linha.posicao);
    setValue("especialidade." + indexLinha + ".tipo", "ESPECIALIDADE_LINHA");
  }

  let especialidade = {
    especialidade: linha.nomeEspecialidade,
    posicao: linha.posicao,
    tipo: "ESPECIALIDADE_LINHA"
  }

  return(
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={control}
          name={"especialidade." + indexLinha}
          defaultValue={especialidade}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={(value) => { field.onChange(value); onChange(value); }} defaultValue={linha.nomeEspecialidade}>
                <FormControl className="w-[300px] h-[23px] border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tabela.linhasEspecialidades.map((especialidade, index) => {
                    return(
                      <SelectItem 
                        value={especialidade.nomeEspecialidade}
                        key={index}
                      >
                        {especialidade.nomeEspecialidade}
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
      <div className="flex items-center justify-between border-black w-[300px] h-[25px]"></div>
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