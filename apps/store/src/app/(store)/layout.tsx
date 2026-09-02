import type { Metadata } from 'next';
import { Bebas_Neue, Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';
import { Navbar } from '@/components/Navbar';
import { GlobalCart } from '@/components/GlobalCart';
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://styfla.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'STYFLA® | High Performance Jiu-Jitsu & No-Gi Apparel',
    template: '%s | STYFLA® High Performance Jiu-Jitsu',
  },
  description:
    'Decida Continuar. Rash guards e kimonos de alta performance, nascidos da trajetória de João FlashBoy no Jiu-Jitsu de alto rendimento. Conformidade estrita com o regulamento IBJJF / CBJJ.',
  keywords: [
    'Styfla',
    'Rash Guard',
    'Jiu-Jitsu',
    'No-Gi',
    'Kimono',
    'IBJJF Approved',
    'João Flashboy',
    'Fight Shorts',
    'High Performance BJJ',
    'Decida Continuar',
  ],
  authors: [{ name: 'STYFLA No-Gi Apparel' }],
  creator: 'STYFLA',
  publisher: 'STYFLA',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'STYFLA® | High Performance Jiu-Jitsu',
    description:
      'Uma decisão. Todos os dias. Armaduras de performance forjadas em poliamida de alta densidade para quem vive o tatame.',
    url: siteUrl,
    siteName: 'STYFLA',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/brand/logo-with-slogan.png',
        width: 1200,
        height: 630,
        alt: 'STYFLA - Decida Continuar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STYFLA® | High Performance Jiu-Jitsu',
    description: 'Decida Continuar. Equipamentos No-Gi homologados pela IBJJF.',
    images: ['/brand/logo-with-slogan.png'],
  },
  icons: {
    icon: '/brand/symbol.png',
    shortcut: '/brand/symbol.png',
    apple: '/brand/symbol.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'STYFLA',
    url: siteUrl,
    logo: `${siteUrl}/brand/logo.png`,
    slogan: 'Decida Continuar',
    sameAs: ['https://instagram.com/styfla.br', 'https://instagram.com/styfla.oficial'],
  };

  return (
    <html
      lang="pt-BR"
      className={`h-full bg-black text-white ${bebasNeue.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-white selection:text-black">
        <AnalyticsScripts />
        <Navbar />
        <div className="flex-1">{children}</div>
        <GlobalCart />
      </body>
    </html>
  );
}
