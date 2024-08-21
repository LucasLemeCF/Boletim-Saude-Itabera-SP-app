import { Inter } from 'next/font/google';

export const metadata = {
  title: "Boletim Saúde - Itaberá",
  description: "Boletim de atendimentos médicos de Itaberá SP",
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
