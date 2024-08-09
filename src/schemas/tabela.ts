export interface Tabela {
    data: string;
    especialidadesCabecalhos: CabecalhoTabela[];
    cirurgioesCabecalhos: CabecalhoTabelaCirurgioes[];
}
  
export interface CabecalhoTabela {
    posicao: number;
    textos: TextosCabalho[];
    especialidades: EspecialidadesTabela[];
}

export interface TextosCabalho {
    id: number;
    texto: string;
}

export interface EspecialidadesTabela {
    posicao: number;
    especialidadeId: number;
    especialidade: string;
    pacientesAtendidosDia: number;
    metaDiaria: number;
    pacientesAtendidosMes: number;
    metaMensal: number;
}

export interface CabecalhoTabelaCirurgioes {
    posicao: number;
    textos: TextosCabalho[];
    cirurgioes: CirurgioesTabela[];
}

export interface CirurgioesTabela {
    posicao: number;
    procedimentoId: number;
    cirurgiao: string;
    procedimento: string;
    pacientesAtendidosDia: string;
    pacientesAtendidosMes: string;
    pacientesAtendidosAno: string;
}