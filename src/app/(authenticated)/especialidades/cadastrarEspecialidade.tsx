import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { EspecialidadeFormData } from "../../../schemas/responseEspecialidade";
import ButtonLocal from "../../../utils/ButtonLocal";

export function DialogCloseButton({register, handleSubmit, session, setLoading, fetchData}) {
    async function onSubmit(dadosNovos: EspecialidadeFormData) {
        if (session) {
            const cadastrarEspecialidade = async () => {
                setLoading(true);
                try {
                    await fetch(process.env.NEXT_PUBLIC_API + '/api/especialidade', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: session?.user.token
                        },
                        body: JSON.stringify({
                            especialidade: dadosNovos.especialidade,
                            medico: dadosNovos.medico,
                            metaDiaria: dadosNovos.metaDiaria,
                            metaMensal: dadosNovos.metaMensal,
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
                <ButtonLocal texto={"Cadastrar Especialidade"} color={"bg-[#337B5B] w-[270px] h-[40px]"} type={"button"} icon="Adicionar"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Cadastrar Especialidade</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col items-center space-y-2">
                    <div>
                        <label className="ml-4">Especialidade</label>
                        <input className="bg-white w-[400px] h-[40px] py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
                            placeholder="Insira a especialidade"
                            name="especialidade" {...register("especialidade", {
                                required: "Insira a especialidade" 
                            })}
                        />
                    </div>
                    <div>
                        <label className="ml-4">Médico</label>
                        <input className="bg-white w-[400px] h-[40px] py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
                            placeholder="Insira o nome do médico"
                            name="medico" {...register("medico")}
                        />
                    </div>
                    <div>
                        <label className="ml-4">Meta Diária</label>
                        <input className="bg-white w-[400px] h-[40px] py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
                            placeholder="Insira a meta diária"
                            name="metaDiaria" {...register("metaDiaria", {
                                valueAsNumber: true,
                                required: "Insira a meta diária" 
                            })}
                        />
                    </div>
                    <div>
                        <label className="ml-4">Meta Mensal</label>
                        <input className="bg-white w-[400px] h-[40px] py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
                            placeholder="Insira a meta mensal"
                            name="metaMensal" {...register("metaMensal", {
                                valueAsNumber: true,
                                required: "Insira a meta mensal" 
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