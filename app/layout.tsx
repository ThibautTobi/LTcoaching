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
  title: 'Acceuil – LT Coaching | Coach Sportif, Nutrition & Bien-être',
  description:
    'Coaching sportif sur-mesure à Villers-Écalles, Barentin et en ligne. Musculation, nutrition, yoga, pilate, reflexiologie, préparation mentale et coaching d’entreprise par LT Coaching.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png' },
    ],
  },
  keywords: [
    'coaching sportif Villers-Écalles',
    'coach sportif Barentin',
    'programme musculation personnalisé',
    'nutrition sportive',
    'cours de yoga',
    'cours de pilate',
    'reflexiologie',
    'préparation mentale athlètes',
    'coaching entreprise bien-être',
    'préparation concours sportifs',
    'small group training',
    'coaching à distance en ligne',
  ],
  authors: [{ name: 'LT Coaching', url: 'https://www.tonsite.com' }],
  openGraph: {
    title: 'LT Coaching – Coaching Sportif à Villers-Écalles et Barentin',
    description:
      'Transforme ton corps et ton mental avec un coaching sur-mesure, en présentiel ou en ligne.',
    locale: 'fr_FR',
    type: 'website',
    // a changer
    url: 'https://www.tonsite.com',
    images: [
      {
        url: 'https://www.tonsite.com/og-ltcoaching.webp',
        width: 1200,
        height: 630,
        alt: 'Coach sportif LT Coaching en séance à Villers-Écalles et Barentin',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //  informations a finaliser et changer l'adresse final
  const schemaOrganization = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SportsActivityLocation'],
    '@id': 'https://www.tonsite.com/#ltcoaching',
    name: 'LTcoaching',
    image: 'https://www.tonsite.com/logo-google-ltcoaching.png',
    logo: 'https://www.tonsite.com/LTcoaching-sansBG.png',
    url: 'https://www.tonsite.com',
    // "telephone": "+33 000000000",
    email: 'ltcoaching.contact@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Villers-Écalles',
      postalCode: '76360',
      addressCountry: 'FR',
    },
    openingHours: 'Mo-Su 00:00-23:59',
    sameAs: [
      'https://facebook.com/profile.php?id=100078540893893',
      'https://instagram.com/ltcoaching.sportnutrition',
    ],
    areaServed: ['Villers-Écalles', 'Barentin', 'Périphérie'],
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrganization),
          }}
        />
      </head>
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
