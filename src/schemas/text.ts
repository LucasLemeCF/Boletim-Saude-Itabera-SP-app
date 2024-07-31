import * as z from "zod";

const linhas = z.object({
    tipo: z.string(),
    componenteId: z.number(),
    posicao: z.number(),
    pacientesAtendidos: z.number(),
})

export const dadosTabelaSchema = z.object({
    data: z.string(),
    linhas: z.array(linhas),
})

export type TabelaFormData = z.infer<typeof dadosTabelaSchema>;