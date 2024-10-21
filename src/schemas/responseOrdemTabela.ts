import * as z from "zod";

const texto = z.object({
    texto: z.string(),
})

const linhasTabela =  z.object({
    posicao: z.number(),
    tipo: z.string(),
    componenteId: z.string(),
})

export const cabecalhosTabela = z.object({
    posicao: z.number(),
    tipo: z.string(),
    textos: z.array(texto),
})

export const dadosOrdemTabelaSchema = z.object({
    data: z.string(),
    linhas: z.array(linhasTabela),
    cabecalhos: z.array(cabecalhosTabela)
})

export type OrdemTabelaFormData = z.infer<typeof dadosOrdemTabelaSchema>;