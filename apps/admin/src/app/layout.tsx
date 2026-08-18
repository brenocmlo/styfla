import type { Metadata } from 'next';
import './globals.css';
import { AdminShell } from '@/components/AdminShell';

export const metadata: Metadata = {
  title: 'Styfla Admin | Painel de Controle de E-commerce',
  description: 'Gerenciamento de estoque, pedidos, clientes e catálogo de rash guards da Styfla.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full bg-[#090A0C] text-[#F4F4F6]">
      <body className="min-h-full flex antialiased selection:bg-[#E63946] selection:text-white">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
