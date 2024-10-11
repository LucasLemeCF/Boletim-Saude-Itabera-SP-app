import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { CirurgiaoFormData } from "../../../schemas/responseCirurgiao";
import ButtonLocal from "../../../utils/ButtonLocal";

export function CardAdicionarCirurgiao({register, handleSubmit, session, setLoading, fetchData}) {
    async function onSubmit(dadosNovos: CirurgiaoFormData) {
        if (session) {
            const cadastrarEspecialidade = async () => {
                setLoading(true);
                try {
                    await fetch(process.env.NEXT_PUBLIC_API + '/api/cirurgiao', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: session?.user.token
                        },
                        body: JSON.stringify({
                            nome: dadosNovos.nome
                        }),
                    }); 
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    fetchData();
                    setLoading(false);
                }
            };
            
            cadastrarEspecialidade();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonLocal texto={"Cadastrar Cirurgião"} color={"bg-[#337B5B] w-[240px] h-[40px]"} type={"button"} icon="Adicionar"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Cadastrar Cirurgião</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col items-center space-y-2">
                    <div>
                        <label className="ml-4">Cirurgião</label>
                        <input className="bg-white w-[400px] h-[40px] py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
                            placeholder="Insira o nome do cirurgião"
                            name="nome" {...register("nome", {
                                required: "O nome do cirurgião é obrigatório" 
                            })}
                        />
                    </div>
                </form>
                <DialogFooter className="sm:justify-end mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="border border-black hover:bg-black/10 rounded-[6px]">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="button" className="bg-[#337B5B] hover:bg-[#337B5B]/90 rounded-[6px] text-white" onClick={handleSubmit(onSubmit)}>
                        Cadastrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}