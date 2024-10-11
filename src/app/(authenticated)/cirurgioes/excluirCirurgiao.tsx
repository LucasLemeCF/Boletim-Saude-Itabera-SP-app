import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';

export function CardExcluirCirurgiao({handleSubmit, session, setLoading, fetchData, field}) {
    const excluirCirurgiao = (id: Number) => {
        if (session) {
          const excluirCirurgiao = async () => {
            setLoading(true);
            try {
              await fetch(process.env.NEXT_PUBLIC_API + '/api/cirurgiao/' + field.id, {
                method: "DELETE",
                headers: {
                  authorization: session?.user.token
                },
              }); 
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              fetchData();
              setLoading(false);
            }
          };
          
          excluirCirurgiao();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <FaTrashAlt/>
            </DialogTrigger>
            <DialogContent className="w-[400px] mt-4 flex flex-col justify-center">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Tem certeza que deseja excluir o cirurgião {field.nome}?</DialogTitle>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="border border-black hover:bg-black/10 rounded-[6px]">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="button" className="bg-red-600 hover:bg-red-700 rounded-[6px] text-white" onClick={() => excluirCirurgiao(field.id)}>
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}