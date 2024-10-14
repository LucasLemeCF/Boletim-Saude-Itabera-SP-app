import * as z from "zod";

export const dadosProcedimentoSchema = z.object({
    nome: z.string({
        required_error: "O nome do procedimento é obrigatório"
    }).min(1)
})

export type ProcedimentoFormData = z.infer<typeof dadosProcedimentoSchema>;