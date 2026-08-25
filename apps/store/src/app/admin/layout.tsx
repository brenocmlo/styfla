import type { Metadata } from 'next';
import { Bebas_Neue, Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Styfla Admin | Painel de Controle de E-commerce',
  description: 'Gerenciamento de estoque, pedidos, clientes e catálogo de rash guards da Styfla.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`h-full bg-black text-white ${bebasNeue.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-full antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
