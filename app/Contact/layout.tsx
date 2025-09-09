import { Metadata } from 'next';
import Script from 'next/script';

// mofifier les liens
export const metadata: Metadata = {
  title: 'Contact – LT Coaching | Coach Sportif, Nutrition & Bien-être',
  description:
    'Contactez LT Coaching pour vos besoins en coaching sportif, nutrition et bien-être. Téléphone, email, horaires et formulaire de contact.',
  keywords: [
    'contact LT Coaching',
    'téléphone coach sportif',
    'email coach',
    'adresse coach',
    'Villers-Écalles',
    'Barentin',
  ],
  openGraph: {
    title: 'Contact – LT Coaching',
    description:
      'Contactez-nous pour toute question sur nos services de coaching sportif, nutrition et bien-être.',
    url: 'https://www.tonsite.com/contact',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.tonsite.com/og-ltcoaching.webp',
        width: 1200,
        height: 630,
        alt: 'LT Coaching - Page Contact',
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'LT Coaching',
      url: 'https://www.tonsite.com',
      logo: 'https://www.tonsite.com/LTcoaching-sansBG.png',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          //   telephone: "",
          contactType: 'customer service',
          areaServed: 'FR',
          availableLanguage: ['French'],
        },
      ],
      address: {
        '@type': 'PostalAddress',
        // streetAddress: "",
        addressLocality: 'Villers-Écalles',
        postalCode: '76360',
        addressCountry: 'FR',
      },
    },
  };

  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
