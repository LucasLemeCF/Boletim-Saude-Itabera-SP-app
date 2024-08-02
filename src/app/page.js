import Tabela from '../components/Tabela/index';

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">
      <div className="flex flex-col items-center justify-between">
        <Tabela/>
      </div>
    </main>
  );
}