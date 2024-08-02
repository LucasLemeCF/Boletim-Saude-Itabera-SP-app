import Image from 'next/image'

export const Aside = () => {
    return (
        <aside className="w-64 h-screen fixed bg-[#337B5B] flex flex-col">
            {header()}
            {navigation()}
        </aside>
    )
}

const header = () => {
    return (
        <div className="flex flex-row justify-center items-center self-stretch mt-5">
           {logo()}
           {/* {seta()} */}
        </div>
    )
}

const logo = () => {
    return (
       <div className="flex items-center gap-6 self-stretch w-48">
            <Image 
                src="/logo.png"
                width={50}
                height={50}
                alt="Logo Itaberá SP"
            />
            <div>
                <p className="text-white text-[11px] font-impact">
                    Prefeitura Municipal de
                </p>
                <p className="text-white text-[38px] leading-8 font-impact mt-0  ">
                    ITABERÁ
                </p>
            </div>
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
        <div className={`flex items-center self-stretch rounded-[6px] py-2 px-3 hover:cursor-pointer ${active ? 'bg-teal-50' : 'hover:bg-teal-50/25'}`}>
            <a href={link} className={`text-lg ${active ? 'text-green-900' : 'text-white'}`}>
                {texto}
            </a>
        </div>
        
    )
}