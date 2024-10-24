
export function montarValoresLinhas(dadosTabela, especialidades, procedimentosCirurgioes) {
    const linhas: any[] = [];

    let posicao = 0;

    dadosTabela.especialidade.map((linha) => {
        especialidades.map((especialidade) => {
            if (especialidade.nomeEspecialidade == linha.especialidade) {
                linhas.push({
                    posicao: linha.posicao,
                    tipo: "ESPECIALIDADE_LINHA",
                    componenteId: especialidade.idEspecialidade,
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

    return linhas;
}

export function montarCabecalhos(tabela) {
    const cabecalhos: any[] = [];

    if (tabela !== null) {
        tabela.cabecalhosEspecialidades.map((cabecalho) => {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "ESPECIALIDADE_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0],
                    }
                ]
            });
        });

        tabela.cabecalhosCirurgioes.map((cabecalho) => {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "CIRURGIAO_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0],
                    },
                    {
                        texto: cabecalho.textos[1],
                    }
                ]
            });
        });
    }

    console.log(cabecalhos)
   
    return cabecalhos;
}

export function montarValoresCabecalhos(dadosNovos) {
    const cabecalhos = [] as any;

    dadosNovos.cabecalhos.map((cabecalho) => {
        if (cabecalho.tipo == "ESPECIALIDADE_CABECALHO") {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "ESPECIALIDADE_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0].texto,
                    }
                ]
            });
        } else {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "CIRURGIAO_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0].texto,
                    },
                    {
                        texto: cabecalho.textos[1].texto,
                    }
                ]
            });
        }
    });

    return cabecalhos;
}

export function montarTabela(dadosTabela, especialidades, procedimentosCirurgioes) {
    let resultado = {} as any;

    if (dadosTabela !== null && especialidades !== null) {
        resultado = {
            cabecalhosEspecialidade: montarCabecalhosEspecialidade(dadosTabela),
            cabecalhosCirurgioes: montarCabecalhosCirurgioes(dadosTabela),
            linhasEspecialdades: montarLinhasEspecialidades(dadosTabela, especialidades),
            linhasCirurgioes: montarLinhasCirurgioes(dadosTabela, procedimentosCirurgioes),
        }
    }

    return resultado
}

function montarCabecalhosEspecialidade(dadosTabela) {
    const cabecalhos = [] as any;

    dadosTabela.cabecalhosTabela.map((cabecalho) => {
        if (cabecalho.tipo == "ESPECIALIDADE_CABECALHO") {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "ESPECIALIDADE_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0].texto,
                    }
                ]
            });
        }
    });

    return cabecalhos;
}

function montarCabecalhosCirurgioes(dadosTabela) {
    const cabecalhos = [] as any;

    dadosTabela.cabecalhosTabela.map((cabecalho) => {
        if (cabecalho.tipo == "CIRURGIAO_CABECALHO") {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "CIRURGIAO_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0].texto,
                    },
                    {
                        texto: cabecalho.textos[1].texto,
                    }
                ]
            });
        }
    });

    return cabecalhos;
}

function montarLinhasEspecialidades(dadosTabela, especialidades) {
    const linhas = [] as any;

    dadosTabela.linhasTabela.map((linha) => {
        if (linha.tipo == "ESPECIALIDADE_LINHA") {
            linhas.push({
                posicao: linha.posicao,
                tipo: "ESPECIALIDADE_LINHA",
                nomeCirurgiao: buscarNomeEspecialidade({linha, especialidades}),
                componenteId: linha.componenteId,
            });
        }
    });

    return linhas;
}

function montarLinhasCirurgioes(dadosTabela, procedimentosCirurgioes) {
    const linhas = [] as any;

    dadosTabela.linhasTabela.map((linha) => {
        if (linha.tipo == "CIRURGIAO_LINHA") {
            linhas.push({
                posicao: linha.posicao,
                tipo: "CIRURGIAO_LINHA",
                componenteId: linha.componenteId,
            });
        }
    });

    return linhas;
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
  