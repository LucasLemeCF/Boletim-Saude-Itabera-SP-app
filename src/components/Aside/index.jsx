import Image from 'next/image'

export const Aside = () => {
    return (
        <aside className="w-64 h-screen bg-[#337B5B] flex flex-col">
            {header()}
            {navigation()}
        </aside>
    )
}

const header = () => {
    return (
        <div className="flex flex-row justify-center items-center self-stretch mt-5">
           {logo()}
           {seta()}
        </div>
    )
}

const logo = () => {
    return (
       <div className="flex items-center gap-6 self-stretch w-48">
            <Image 
                src="/logo.png"
                width={40}
                height={40}
                alt="Logo Itaberá SP"
            />
            <Image 
                src="/logo-texto.png"
                width={100}
                height={50}
                alt="Prefeiura Municipal de Itaberá SP"
            />
       </div>
    )
}

const seta = () => {
    return (
        <div className="flex justify-end items-center gap-10">
            <Image 
                src="/seta.png"
                width={6}
                height={10}
                alt="Seta para esquerda"
            />
        </div>
    )
}

const navigation = () => {
    return (
        <div className="flex flex-col items-start self-stretch gap-6 mt-10 px-2">
            {botao('Boletim Médico', '/api/tabela', true)}
            {botao('Editar Boletim', '/api/ordem-tabela', false)}
            {botao('Especialidades', '/api/especialidade', false)}
            {botao('Cirurgiões', '/api/cirurgiao', false)}
        </div>
    )
}

const botao = (texto, link, active) => {
    return (
        <div className={`flex items-center self-stretch rounded-[6px] py-2 px-3 ${active ? 'bg-teal-50' : ''}`}>
            <a href={link} className={`text-lg ${active ? 'text-green-900' : 'text-white'}`}>
                {texto}
            </a>
        </div>
        
    )
}