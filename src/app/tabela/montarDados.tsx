import { TabelaFormData } from "../../schemas/responseTabela";
import { Tabela } from "../../schemas/tabela";

export function montarTabelaFormData(dadosTabela: Tabela, dadosNovos: TabelaFormData) {
    const resultado = [] as any;

    const linhas = montarValoresLinhas(dadosTabela);

    for (let i = 0; i < linhas.length; i++) {
        resultado.push({
        tipo: "ESPECIALIDADE_LINHA",
        componenteId: linhas[i].componenteId,
        posicao: linhas[i].posicao,
        pacientesAtendidos: dadosNovos.linhas[i].pacientesAtendidos
        });
    }

    return resultado;
}
  
export  function montarValoresLinhas(dadosTabela: Tabela) {
    const linhas = [] as any;

    if (dadosTabela !== null) {
        dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
        cabecalho.especialidades.map((especialidade) => {
            linhas.push({
            tipo: "ESPECIALIDADE_LINHA",
            componenteId: especialidade.especialidadeId,
            posicao: especialidade.posicao,
            pacientesAtendidos: especialidade.pacientesAtendidosDia
            });
        });
        });
    }

    return linhas;
}
  
export  function MontarCabecalhos(dadosTabela: Tabela) {
    const cabecalhos: any[] = [];

    for (let i = 0; i < dadosTabela.especialidadesCabecalhos.length; i++) {
        cabecalhos.push({
        posicao: dadosTabela.especialidadesCabecalhos[i].posicao,
        tipo: "ESPECIALIDADE_CABECALHO",
        textos: [
            {
            texto: dadosTabela.especialidadesCabecalhos[i].textos[0].texto
            }
        ]
        });
    }

    return cabecalhos;
}