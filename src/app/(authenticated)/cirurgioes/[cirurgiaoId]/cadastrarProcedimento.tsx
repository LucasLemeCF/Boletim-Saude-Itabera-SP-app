import { Button } from "../../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { ProcedimentoFormData } from "../../../../schemas/responseProcedimento";
import ButtonLocal from "../../../../utils/ButtonLocal";

export function CardAdicionarProcedimento({register, handleSubmit, session, setLoading, fetchData, cirurgiaoId}) {
    async function onSubmit(dadosNovos: ProcedimentoFormData) {
        if (session) {
            const cadastrar = async () => {
                setLoading(true);
                try {
                    await fetch(process.env.NEXT_PUBLIC_API + '/api/procedimentoCirurgiao', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: session?.user.token
                        },
                        body: JSON.stringify({
                            nome: dadosNovos.nome,
                            cirurgiaoId: cirurgiaoId
                        }),
                    }); 
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    fetchData();
                    setLoading(false);
                }
            };
            
            cadastrar();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonLocal texto={"Cadastrar Procedimento"} color={"bg-[#337B5B] w-[180px] h-[40px]"} type={"button"} icon="Adicionar"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Cadastrar Procedimento</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col items-center space-y-2">
                    <div>
                        <label className="ml-4">Procedimento</label>
                        <input className="bg-white w-[400px] h-[40px] py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
                            placeholder="Insira o nome do procedimento"
                            name="nome" {...register("nome", {
                                required: "O nome do procedimento é obrigatório" 
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