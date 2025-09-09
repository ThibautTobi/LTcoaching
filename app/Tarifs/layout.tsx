import { Metadata } from 'next';
import Script from 'next/script';
import { DataService } from '@/utils/data';

export const metadata: Metadata = {
  title: 'Tarifs Coaching Sportif, Bien-être & Nutrition',
  description:
    'Découvrez nos services de coaching sportif, bien-être et nutrition. Programmes personnalisés, tarifs transparents et résultats garantis.',
  keywords: [
    'coaching sportif',
    'tarifs coach',
    'nutrition',
    'bien-être',
    'coach personnel',
    'programme personnalisé',
  ],
  openGraph: {
    title: 'Tarifs Coaching Sportif & Nutrition - LTcoaching',
    description:
      'Découvrez nos services de coaching adaptés à vos objectifs : sport, nutrition, bien-être.',
    url: 'https://www.tonsite.com/tarifs',
    siteName: 'LTcoaching',
    images: [
      {
        url: 'https://www.tonsite.com/og-ltcoaching.webp',
        width: 1200,
        height: 630,
        alt: 'Coaching sportif et nutrition LTcoaching',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Liste des services de coaching',
    description:
      'Découvrez nos services de coaching sportif, nutrition et bien-être avec leurs tarifs et options personnalisées.',
    itemListElement: DataService.map((service, index) => ({
      '@type': 'Service',
      position: index + 1,
      name: service.title,
      description: service.Description,
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    })),
  };

  return (
    <>
      <Script
        id="schema-tarifs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {children}
    </>
  );
}
