"use server"

import { TabelaFormData } from "@/schemas/text";

export async function testaFormulario(data: TabelaFormData) {
    console.log(`Teste de Formulario:  ${JSON.stringify(data)}`);
}