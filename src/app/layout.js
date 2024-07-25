import { Inter } from 'next/font/google';
import { Aside } from "../components/Aside";
import { Header } from "../components/Header";
import "./globals.css";

export const metadata = {
  title: "Boletim Saúde - Itaberá",
  description: "Boletim de atendimentos médicos de Itaberá SP",
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        <div className='app-container'>
          <div className="w-64 h-full">
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
