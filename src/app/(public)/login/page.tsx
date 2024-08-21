import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return ( 
    <div className="bg-white w-[540px] px-[72px] py-12 rounded-[20px] flex flex-col items-center justify-between shadow-[6px_6px_8px_0_rgba(0,0,0,0.25)]">
      <Logo/>
      <FormLogin/>
    </div>
  )
}

const Logo = () => (
  <div className="flex items-center justify-between">
    <Image 
      src="/logo.png"
      width={75}
      height={75}
      alt="Logo Itaberá SP"
      className="mr-4"
    />
    <Image 
      src="/logo-texto-verde.png"
      width={191}
      height={75}
      alt="Prefeitura Municipal de Itaberá"
    />
  </div>
)

function FormLogin () {
  // const { register, handleSubmit } = useForm<LoginFormData>({
  //   resolver: zodResolver(dadosLoginSchema),
  //   defaultValues: {  
  //     usuario: '',
  //     senha: ''
  //   }
  // });

  return  (
    <div className="w-full mt-8">
      <form>
        <div className="w-full">
          <p className="w-full h-4 mb-3 text-sm">Usuário</p>
          <input className="bg-white w-full h-12 py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" type="text" placeholder="Digite o nome do usuário"
            // {...register(`usuario`, { required: "Digite o nome do usuário" })}
          />
        </div>
    
        <div className="w-full mt-6">
          <p className="w-full h-4 mb-3 text-sm">Senha</p>
          <input className="bg-white w-full h-12 py-3 px-4 border-2 rounded-[8px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" type="text" placeholder="Digite a senha"
            // {...register(`senha`, { required: "Digite a senha" })}
          />
        </div>
    
        <div className="bg-[#337B5B] w-full h-[50px] mt-8 rounded-[8px] flex items-center hover:bg-[#2f7052]">
          <Link className="w-full text-white text-center" href="/tabela">Entrar</Link>
        </div>
      </form>
    </div>
  )
}