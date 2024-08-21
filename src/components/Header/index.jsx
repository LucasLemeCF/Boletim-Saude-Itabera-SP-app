import Image from 'next/image';
import { MdLogout } from "react-icons/md";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";

export const Header = () => {
    return (
        <header className="flex w-full h-[75px] py-4 px-8 justify-center items-center gap-4 bg-[#337B5B]">
            <div className="flex w-full justify-end items-center gap-3">
                <p className="text-white">
                    Administrador
                </p>
                <Popover>
                    <PopoverTrigger>
                        <div>
                            <Image
                                src="/user.png"
                                width={40}
                                height={40}
                                alt="Icone de usuário"
                                className="cursor-pointer"
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <a href="/login" className="flex items-center">
                            <MdLogout className="w-6 h-6 mr-2 text-[#337B5B]"/>
                            <p className="text-lg text-[#337B5B]">Sair</p>
                        </a>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    )
}