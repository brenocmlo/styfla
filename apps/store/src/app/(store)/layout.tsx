import type { Metadata } from 'next';
import { Bebas_Neue, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { GlobalCart } from '@/components/GlobalCart';

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
  title: 'Styfla | High Performance Jiu-Jitsu',
  description:
    'Decida Continuar. Rash guards e kimonos de alta performance, nascidos da trajetória de João FlashBoy no Jiu-Jitsu de alto rendimento. Conformidade estrita com o regulamento IBJJF / CBJJ.',
  openGraph: {
    title: 'Styfla | High Performance Jiu-Jitsu',
    description:
      'Uma decisão. Todos os dias. Armaduras de performance forjadas para quem vive o tatame.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Styfla',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`h-full bg-black text-white ${bebasNeue.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased selection:bg-white selection:text-black">
        <Navbar />
        <div className="flex-1">{children}</div>
        <GlobalCart />
      </body>
    </html>
  );
}
