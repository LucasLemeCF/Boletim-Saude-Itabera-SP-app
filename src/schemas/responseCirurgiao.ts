import * as z from "zod";

export const dadosCirurgiaoSchema = z.object({
    nome: z.string({
        required_error: "O nome do cirurgião é obrigatório"
    }).min(1),
})

export type CirurgiaoFormData = z.infer<typeof dadosCirurgiaoSchema>;