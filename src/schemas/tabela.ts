export interface Tabela {
    data: string;
    especialidadesCabecalhos: CabecalhoTabela[];
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