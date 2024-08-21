import * as z from "zod";

export const dadosLoginSchema = z.object({
    usuario: z.string(),
    senha: z.string()
})

export type LoginFormData = z.infer<typeof dadosLoginSchema>;