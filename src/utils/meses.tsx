export function numeroParaMes(numero: string): string {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const index = parseInt(numero, 10) - 1;
    return meses[index] || "Mês inválido";
}