import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './src/components/header';
import Footer from './src/components/footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Coaching Sportif Personnalisé – LT Coaching',
  description:
    'LT Coaching ,Coaching sportif sur-mesure à Villers-Écalles, Barentin et à distance. Musculation, nutrition, préparation mentale et coaching d’entreprise.',
  keywords: [
    'coaching sportif Villers-Écalles',
    'coach sportif Barentin',
    'programme musculation',
    'nutrition personnalisée',
    'préparation mentale',
    'coaching entreprise',
    'coaching test concours',
    'small group training',
    'coach personnel à distance',
  ],
  authors: [{ name: 'LT Coaching' }],
  openGraph: {
    title: 'Coaching Sportif à Villers-Écalles & Online',
    description:
      'Transforme ton corps et ton mental avec un coaching complet. En présentiel ou à distance.',
    locale: 'fr_FR',
    type: 'website',
    // a changer
    url: 'https://www.tonsite.com',
    images: [
      {
        // a changer
        url: 'https://www.tonsite.com/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coach sportif Barentin en action',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching Sportif Personnalisé',
    description: 'Coach sportif à Villers-Écalles, Barentin et en ligne.',
    // a changer
    images: ['https://www.tonsite.com/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
