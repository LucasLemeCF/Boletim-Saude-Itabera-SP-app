"use client"

import { FaArrowDown, FaArrowUp, FaTrashAlt } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
import { z } from "zod";
 
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

export default function LinhasOrdemTabelaEspecialidade({ dadosTabela, watchLinha, especialidades, control, setValue, register }) {
  const tamanhoCabecalho = dadosTabela.cabecalhosTabela.length;
  let cabecalhos = SepararCabecalhosEspecialidade(dadosTabela.cabecalhosTabela);
  let indexLinha = -1;

  console.log(watchLinha);

  return (
    <div>
      {cabecalhos.map((cabecalho, indexCabecalho) => {
        return(
          <div className="border border-t-0 border-black" key={indexCabecalho}>
            <LinhaCabecalho cabecalho={cabecalho} register={register} indexCabecalho={indexCabecalho} setValue={setValue} watchLinha={watchLinha}/>
            {dadosTabela.linhasTabela.map((linha, indexLinhaTabela) => {
              const linhaInicial = dadosTabela.cabecalhosTabela[indexCabecalho].posicao + 1;
              let linhaAtual = linhaInicial + indexLinhaTabela;

              let linhaFinal;
              if (tamanhoCabecalho > indexCabecalho + 1) {
                linhaFinal = dadosTabela.cabecalhosTabela[indexCabecalho + 1].posicao - 1;
              } else {
                linhaFinal = dadosTabela.linhasTabela.length;
              }

              if (linhaAtual <= linhaFinal) {
                indexLinha++;
                return(
                  <LinhaTabela key={indexLinhaTabela} linha={dadosTabela.linhasTabela[indexLinha]} linhaAtual={linhaAtual} 
                    especialidades={especialidades} control={control} indexLinhaTabela={indexLinhaTabela}
                    watchLinha={watchLinha} setValue={setValue}
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

function LinhaCabecalho({cabecalho, register, indexCabecalho, setValue, watchLinha}) {
  function onChange(value) {
    setValue("cabecalhos." + indexCabecalho + ".posicao", indexCabecalho);
    setValue("cabecalhos." + indexCabecalho + ".tipo", "ESPECIALIDADE_CABECALHO");
    setValue("cabecalhos." + indexCabecalho + ".textos.0.texto", value);
    console.log(watchLinha);
  }

  return (
    <div className="flex items-center justify-between divide-x bg-[#E2EFDB]">
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        // defaultValue={cabecalho.textos[0].texto}
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

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

function LinhaTabela({linha, linhaAtual, especialidades, control, indexLinhaTabela, watchLinha, setValue}) {
  const nomeEspecialidade = buscarNomeEspecialidade({linha, especialidades});

  function onChange(value) {
    setValue("especialidade." + indexLinhaTabela + ".especialidade", value);
    setValue("especialidade." + indexLinhaTabela + ".posicao", linhaAtual);
    setValue("especialidade." + indexLinhaTabela + ".tipo", "ESPECIALIDADE_LINHA");
    // console.log(watchLinha);
  }

  let especialidade = {
    especialidade: nomeEspecialidade,
    posicao: linhaAtual,
    tipo: "ESPECIALIDADE_LINHA"
  }

  return(
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={control}
          name={"especialidade." + indexLinhaTabela}
          defaultValue={especialidade}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={(value) => { field.onChange(value); onChange(value); }} defaultValue={nomeEspecialidade}>
                <FormControl className="w-[300px] h-6 border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {especialidades.map((especialidade, index) => {
                    return(
                      <SelectItem 
                        value={especialidade.especialidade}
                        key={index}
                      >
                        {especialidade.especialidade}
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

function buscarNomeEspecialidade({linha, especialidades}) {
  let nomeEspecialidade = "";

  especialidades.map((especialidade) => {
    if (especialidade.id == linha.componenteId) {
      nomeEspecialidade = especialidade.especialidade;
    }
  });

  return nomeEspecialidade;
}

function SepararCabecalhosEspecialidade(cabecalhos) {
  let cabecalhosEspecialidade = [];

  cabecalhos.map((cabecalho) => {
    if (cabecalho.tipo == "ESPECIALIDADE_CABECALHO") {
      cabecalhosEspecialidade.push(cabecalho);
    }
  });

  return cabecalhosEspecialidade;
}