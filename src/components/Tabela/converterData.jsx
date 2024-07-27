export default function ConverterData(data) {
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
  
    return `${dia < 10 ? '0' + dia : dia}-${mes < 10 ? '0' + mes : mes}-${ano}`
}