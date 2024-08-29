import * as z from "zod";

export const LoginSchema = z.object({
    usuario: z.string().min(1, { message:  "Usuário inválido" }),
    senha: z.string().min(1, { message: "Senha inválida" }),
})

export type LoginFormData = z.infer<typeof LoginSchema>;