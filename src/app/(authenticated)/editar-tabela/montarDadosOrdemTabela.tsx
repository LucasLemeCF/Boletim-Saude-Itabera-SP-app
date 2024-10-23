import { OrdemTabela } from "../../../schemas/ordemTabela";

export function montarValoresLinhas(dadosTabela, especialidades, procedimentosCirurgioes) {
    const linhas: any[] = [];

    let posicao = 0;

    dadosTabela.especialidade.map((linha) => {
        especialidades.map((especialidade) => {
            if (especialidade.especialidade == linha.especialidade) {
                linhas.push({
                    posicao: linha.posicao,
                    tipo: "ESPECIALIDADE_LINHA",
                    componenteId: especialidade.id,
                });
                posicao = linha.posicao;
            }
        });
    });

    dadosTabela.procedimento.map((linha) => {
        procedimentosCirurgioes.map((procedimento) => {
            if (procedimento.cirurgiao == linha.cirurgiao && procedimento.procedimento == linha.procedimento) {
                linhas.push({
                    posicao: linha.posicao + posicao,
                    tipo: "CIRURGIAO_LINHA",
                    componenteId: procedimento.id,
                });

            }
        });
    });

    console.log(dadosTabela);

    return linhas;
}

export function montarCabecalhos(dadosTabela: OrdemTabela) {
    const cabecalhos: any[] = [];

    if (dadosTabela !== null) {
        dadosTabela.cabecalhosTabela.map((linha) => {
            if (linha.tipo == "ESPECIALIDADE_CABECALHO") {
                cabecalhos.push({
                    posicao: linha.posicao,
                    tipo: "ESPECIALIDADE_CABECALHO",
                    textos: [
                        {
                            texto: linha.textos[0].texto,
                        }
                    ]
                });
            } else {
                cabecalhos.push({
                    posicao: linha.posicao,
                    tipo: "CIRURGIAO_CABECALHO",
                    textos: [
                        {
                            texto: linha.textos[0].texto,
                        },
                        {
                            texto: linha.textos[1].texto,
                        }
                    ]
                });
            }
           
        });
    }
   
    return cabecalhos;
}