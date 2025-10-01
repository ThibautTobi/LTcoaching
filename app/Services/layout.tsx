import { Metadata } from 'next';
import Script from 'next/script';
import { DataService } from '@/utils/data';

// adapter les adresses
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services – LT Coaching | Coach Sportif, Nutrition & Bien-être',
    description:
      'Découvrez nos services personnalisés : coaching sportif, nutrition, bien-être et préparation mentale. Des programmes adaptés à vos objectifs.',
    keywords: [
      'coaching sportif',
      'programme nutrition',
      'coach bien-être',
      'préparation mentale',
      'musculation personnalisée',
      'coach à distance',
      'coach Villers-Écalles',
      'coach Barentin',
    ],
    openGraph: {
      title: 'LT Coaching – Services Sport, Nutrition & Bien-être',
      description:
        'Des services sur mesure pour améliorer votre santé, votre forme physique et votre bien-être.',
      url: 'https://www.tonsite.com/services',
      type: 'website',
      locale: 'fr_FR',
      images: [
        {
          url: 'https://www.tonsite.com/og-ltcoaching.webp',
          width: 1200,
          height: 630,
          alt: 'Coaching sportif et nutrition',
        },
      ],
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schéma JSON-LD généré côté serveur
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Services de Coaching Sportif, Nutrition et Bien-être',
    provider: {
      '@type': 'Organization',
      name: 'LT Coaching',
      url: 'https://www.tonsite.com',
      logo: 'https://www.tonsite.com/LTcoaching-sansBG.png',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catalogue des services LT Coaching',
      itemListElement: DataService.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          category: service.categories.join(', '),
          image: `https://www.tonsite.com${service.image || '/logo-google-ltcoaching.png'}`,
        },
      })),
    },
  };

  return (
    <>
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
