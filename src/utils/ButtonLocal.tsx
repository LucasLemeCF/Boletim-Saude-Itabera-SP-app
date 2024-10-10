import { BiPlus, BiSave } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";

interface ButtomProps {
    texto: string;
    color: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    comBotao?: boolean;
    icon?: string;
}
  
export default function ButtonLocal({ texto, color, onClick, type, comBotao = true, icon}: ButtomProps) {
    return (
        <>
            {
                comBotao ?
                <button className={`w-[150px] h-[50px] rounded-[5px] text-white flex items-center justify-start ${color}`} type={type} onClick={onClick}>
                {IconeBotao(icon)}
                <div className="ml-4">{texto}</div>
                </button>
                :
                <button className={`w-[150px] h-[50px] rounded-[5px] text-white flex items-center justify-center ${color}`} type={type} onClick={onClick}>
                <div className="ml-4">{texto}</div>
                </button>
            }
        </>
    )
}

const IconeBotao = (texto: String) => {
    if (texto === "Baixar") {
      return <MdOutlineFileDownload className="w-6 h-6 ml-4"/>
    } else if (texto === "Salvar") {
      return <BiSave className="w-6 h-6 ml-4"/>
    } else if (texto === "Adicionar") {
      return <BiPlus className="w-6 h-6 ml-4"/>
    } else {
      return <div></div>
    }
}