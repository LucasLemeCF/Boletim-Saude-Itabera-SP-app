import { Aside } from "../components/Aside";
import { Header } from "../components/Header";
import "./globals.css";

export const metadata = {
  title: "Boletim Saúde - Itaberá",
  description: "Boletim de atendimentos médicos de Itaberá SP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <div className='app-container'>
          <div className="h-screen">
            <Aside/>
          </div>
          <div className="flex flex-col w-full">
            <Header/>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
