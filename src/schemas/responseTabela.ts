import * as z from "zod";

const texto = z.object({
    texto: z.string(),
})

const cabecalhos =  z.object({
    posicao: z.number(),
    tipo: z.string(),
    textos: z.array(texto),
})

export const linhasEspecialidades = z.object({
    tipo: z.string(),
    componenteId: z.number(),
    posicao: z.number(),
    pacientesAtendidos: z.number({
        required_error: "pacientesAtendidos is required",
        invalid_type_error: "pacientesAtendidos must be a number",
    }),
})

export const dadosTabelaSchema = z.object({
    data: z.string(),
    linhas: z.array(linhasEspecialidades)
})

export type TabelaFormData = z.infer<typeof dadosTabelaSchema>;