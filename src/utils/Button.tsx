import { BiSave } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";

interface ButtomProps {
    texto: string;
    color: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    comBotao?: boolean;
}
  
export default function Button({ texto, color, onClick, type, comBotao = true}: ButtomProps) {
    return (
        <>
            {
                comBotao ?
                <button className={`w-[150px] h-[50px] rounded-[5px] text-white flex items-center justify-start ${color}`} type={type} onClick={onClick}>
                {IconeBotao(texto)}
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
    } else {
      return <div></div>
    }
}