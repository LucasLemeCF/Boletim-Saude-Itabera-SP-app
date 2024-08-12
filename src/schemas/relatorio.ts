import * as z from "zod";

export const RelatorioSchema = z.object({
    tipo: z.string(),
    mes: z.string(),
    ano: z.string(),
})

export type RelatorioFormData = z.infer<typeof RelatorioSchema>;