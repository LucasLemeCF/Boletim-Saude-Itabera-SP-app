import { Inter } from 'next/font/google';
import "./globals.css";

export const metadata = {
  title: "Boletim Saúde - Itaberá",
  description: "Boletim de atendimentos médicos de Itaberá SP",
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body className="bg-gradient-to-tl from-[#337B5B] to-[#49A87E] w-screen h-screen flex items-center justify-center">
        {children}
        <a className="fixed bottom-0 left-0 align-start m-1 text-white" href="https://www.linkedin.com/in/lucas-leme/">Linkedin: /lucas-leme</a>
      </body>
    </html>
  );
}
