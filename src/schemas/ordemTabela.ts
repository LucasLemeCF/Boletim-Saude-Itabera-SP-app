export interface OrdemTabela {
    data: string;
    linhasTabela: LinhasTabela[];
    cabecalhosTabela: CabecalhosTabela[];
}
  
interface LinhasTabela {
    posicao: number;
    tipo: string;
    componenteId: number;
}

interface CabecalhosTabela {
    posicao: number;
    tipo: string;
    textos: TextosCabecalhos[];
}

interface TextosCabecalhos {
    texto: string;
}