import * as z from "zod";

export const LoginSchema = z.object({
    usuario: z.string(),
    senha: z.string(),
})

export type LoginFormData = z.infer<typeof LoginSchema>;