import * as z from "zod";

const texto = z.object({
    texto: z.string(),
})

const cabecalhos =  z.object({
    posicao: z.number(),
    tipo: z.string(),
    textos: z.array(texto),
})

const linhas = z.object({
    tipo: z.string(),
    componenteId: z.number(),
    posicao: z.number(),
    pacientesAtendidos: z.number(),
})

export const dadosTabelaSchema = z.object({
    data: z.string(),
    linhas: z.array(linhas)
})

export type TabelaFormData = z.infer<typeof dadosTabelaSchema>;