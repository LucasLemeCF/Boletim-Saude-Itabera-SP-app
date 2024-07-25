import Tabela from '../components/Tabela/index';

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC]">
      <div className="flex flex-col items-center justify-between">
        <Tabela/>
        {botoes()}
      </div>
    </main>
  );
}

const botoes = () => {
  return (
    <div className="flex items-center justify-between">
    </div>
  )
}