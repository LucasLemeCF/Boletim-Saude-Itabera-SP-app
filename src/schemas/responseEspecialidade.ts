import * as z from "zod";

export const dadosEspecialidadeSchema = z.object({
    especialidade: z.string({
        required_error: "especialidade é obrigatório"
    }).min(1),
    medico: z.string(),
    metaDiaria: z.number(),
    metaMensal: z.number(),
})

export type EspecialidadeFormData = z.infer<typeof dadosEspecialidadeSchema>;