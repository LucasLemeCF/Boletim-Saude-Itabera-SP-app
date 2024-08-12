import { UseFormRegister } from 'react-hook-form';
import { FormField, FormItem } from '../../components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";

interface SelectProps {
    register: UseFormRegister<{
        tipo?: string;
        mes?: string;
        ano?: string;
    }>;
  }

export function SelectTipoRelatorio({control}) {
    return (
        <FormField
          defaultValue={"especialidades"}
          control={control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Tipo"/>
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="especialidades">Especialidades</SelectItem>
                    <SelectItem value="cirurgioes">Cirurgiões</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
    )
}

export function SelectMonth({control}) {
    return (
        <FormField
          defaultValue={buscaMesAtual()}
          control={control}
          name="mes"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Mes"/>
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="01">Janeiro</SelectItem>
                    <SelectItem value="02">Fevereiro</SelectItem>
                    <SelectItem value="03">Março</SelectItem>
                    <SelectItem value="04">Abril</SelectItem>
                    <SelectItem value="05">Maio</SelectItem>
                    <SelectItem value="06">Junho</SelectItem>
                    <SelectItem value="07">Julho</SelectItem>
                    <SelectItem value="08">Agosto</SelectItem>
                    <SelectItem value="09">Setembro</SelectItem>
                    <SelectItem value="10">Outubro</SelectItem>
                    <SelectItem value="11">Novembro</SelectItem>
                    <SelectItem value="12">Dezembro</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
    )
}

export function SelectYear({control}) {
    return (
        <FormField
          defaultValue={(new Date().getFullYear()).toString()}
          control={control}
          name="ano"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Ano"/>
                </SelectTrigger>
                <SelectContent position="popper">
                    {Array.from({length: calculaTamanhoSelect()}, (_, i) => new Date().getFullYear() - i).map((ano) => (
                        <SelectItem key={ano} value={ano.toString()}>{ano}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
    )
}

const calculaTamanhoSelect = () => {
    let array = [];

    for (let i = new Date().getFullYear(); i >= 2020; i--) {
        array.push(i);
    }

    return array.length;
}

const buscaMesAtual = () => {
    const data = new Date();
    const mes = data.getMonth() + 1;
    return mes < 10 ? "0" + mes : mes.toString();
}