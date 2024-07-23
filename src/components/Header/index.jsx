import Image from 'next/image'

export const Header = () => {
    return (
        <header className="flex h-[75px] py-4 px-8 justify-center items-center gap-4 bg-[#337B5B]">
            <div className="flex w-full justify-end items-center gap-3">
                <p className="text-white">
                    Nome do Usuário
                </p>
                <Image
                    src="/user.png"
                    width={40}
                    height={40}
                    alt="Icone de usuário"
                />
            </div>
        </header>
    )
}