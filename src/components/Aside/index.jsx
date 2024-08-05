import { Navigation } from './navigation';

export const Aside = () => {
    return (
        <aside className="w-64 h-screen fixed bg-[#337B5B] flex flex-col">
            {header()}
            {<Navigation/>}
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
            <img 
                src="/logo.png"
                width="50px"
                height="50px"
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

// const seta = () => {
//     return (
//         <div className="flex justify-end items-center gap-10">
//             <Image 
//                 src="/seta.png"
//                 width={6}
//                 height={10}
//                 alt="Seta para esquerda"
//             />
//         </div>
//     )
// }

