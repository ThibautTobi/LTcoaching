/**
 *  Idées déjà intégrées :
 * - Section SEO avec h1 clair et description.
 * - Cartes coachs professionnelles, responsive, avec hover effet CSS.
 * - Boutons personnalisés sous chaque coach pour favoriser l’action.
 * - Liste de formations et lieux de travail claires et iconifiées.
 * - Accessibilité : aria-labels, alt d’image explicite.
 * - Optimisation SEO : structure sémantique, contenu clair.
 * - Animation légère sans Framer Motion (hover + animate-fade-in possible via Tailwind).

 *  Idées supplémentaires possibles :
 * 1. Composant `CoachCard.tsx` réutilisable pour simplifier le code.
 * 2. Section "Avis clients" (testimonials).
 * 3. Bloc "Nos valeurs" ou "Notre mission".
 * 4. Statistiques : "200 clients satisfaits", "10 ans d’expérience".
 * 5. Intégration future d’un CMS (ex: Sanity, Strapi) pour charger les données.
 * 6. Ajouter des badges de compétences ou de spécialités.
 * 7. Boutons vers WhatsApp / mail direct ou formulaires dynamiques.
 * 8. Carte Google Maps pour localiser les salles (accessibilité + preuve).
 * 9. Ajout de balises meta `next/head` pour améliorer encore le SEO.
 * 10. Accessibilité renforcée (navigation clavier + contraste).

 */

import { Metadata } from 'next';
import CoachProfileCard from '@/app/src/components/coachCard';

/**
 * @file Presentation.tsx
 * @description Ce composant présente les profils de coachs sportifs avec leurs informations détaillées :
 *              nom, image, description, formations, spécialités, expériences et un bouton de contact.
 *              Il intègre également le composant réutilisable `CoachProfileCard`.
 *
 * @component
 * @returns {JSX.Element} Une section de présentation visuelle des coachs, avec mise en forme responsive.
 *
 * @example
 * // Utilisation dans une page Next.js
 * <Presentation />
 *
 * @remarks
 * - Utilise des composants UI personnalisés : `Button`, `CoachProfileCard`, `Lucide icons`.
 * - Utilise Next.js pour le routage (`Link`) et le chargement d'image (`Image`).
 * - Le composant contient un coach affiché manuellement en HTML + un coach via `CoachProfileCard`.
 *   Cela peut servir à comparer ou tester deux approches d'intégration (statique vs dynamique).
 */

export const metadata: Metadata = {
  title: 'Nos coachs sportifs – LTcoaching | Experts en fitness et bien-être',
  description:
    "Découvrez Laure et Thibaut, coachs sportifs diplômés avec plus de 7 ans d'expérience. Spécialistes en préparation physique, nutrition, bien-être et sport santé.",
  openGraph: {
    title: 'Nos coachs sportifs – LTcoaching',
    description:
      "Rencontrez notre équipe de coachs diplômés : préparation physique, nutrition, bien-être, sport santé. Plus de 7 ans d'expérience pour vous accompagner.",
    images: ['/og-ltcoaching.webp'],
  },
};

// modifier les chemins avec l'adresse du site publier et intégrer des image des coachs

export default function Presentation(): JSX.Element {
  return (
    <div className="min-h-screen to-muted text-foreground">
      {/* Schema.org pour Laure */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Laure',
            jobTitle: 'Coach sportif, professeure de yoga et réflexologue',
            image: 'https://www.tonsite.com/laure-coach-sportif.png',
            description:
              "Coach sportif diplômée avec plus de 7 ans d'expérience, spécialisée en nutrition, bien-être et sport santé.",
            alumniOf:
              'BPJEPS AF – Haltérophilie/Musculation et Cours Collectifs',
            knowsAbout: [
              'Nutrition',
              'Sport Santé',
              'Bien-être',
              'Yoga',
              'Pilates',
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'LTcoaching',
            },
          }),
        }}
      />

      {/* Schema.org pour Thibaut */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Thibaut',
            jobTitle:
              'Coach sportif spécialisé en préparation physique et mentale',
            image: 'https://www.tonsite.com/thibaut-preparation-physique.png',
            description:
              "Coach sportif diplômé avec plus de 7 ans d'expérience, spécialisé en préparation physique, mentale et sport santé.",
            alumniOf:
              'BPJEPS AF – Haltérophilie/Musculation et Cours Collectifs',
            knowsAbout: [
              'Préparation physique',
              'Préparation mentale',
              'Sport Santé',
              'Bien-être',
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'LTcoaching',
            },
          }),
        }}
      />

      <section className="py-16 px-8 max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-2">
          <h1 className="text-[24px] font-bold text-primary">
            Découvrez nos coachs sportifs professionnels
          </h1>
          <p className="text-muted-foreground text-lg">
            LTcoaching vous accompagne dans votre transformation physique et
            mentale
            <br />
            grâce à l’expertise de nos coachs diplômés, passionnés par le sport,
            la santé et le bien-être.
          </p>
        </div>
        <CoachProfileCard
          name="Laure"
          image="/images.png"
          imageAlt="Laure, coach sportif experte en yoga, nutrition et bien-être"
          description="Coach sportif diplômée avec plus de 7 ans d'expérience, spécialisée dans le bien-être, la nutrition et la remise en forme. Professeure de yoga et de pilates, elle est également réflexologue plantaire, palmaire et crânienne pour adultes et nourrissons."
          formations={[
            'BPJEPS AF - Haltérophilie/Musculation et Cours Collectifs',
            'Coach en nutrition',
            'Professeur de yoga',
            'Réflexologue plantaire, palmaire et crânienne',
            'Instructrice LesMills',
          ]}
          specialites={[
            'Nutrition',
            'Sport Santé',
            'Bien-être',
            'Yoga',
            'Pilates',
          ]}
          showContact={true}
        />
        <CoachProfileCard
          name="Thibaut"
          image="/images.png"
          imageAlt="Thibaut, coach sportif spécialisé en préparation physique et mentale"
          description="Coach sportif diplômé avec plus de 7 ans d'expérience, spécialisé en préparation physique, préparation aux tests et concours, ainsi qu’en préparation mentale. Instructeur certifié LesMills, il enseigne le BodyPump, le RPM, le BodyBalance, le BodyAttack et le BodyCombat."
          formations={[
            'BPJEPS AF - Haltérophilie/Musculation et Cours Collectifs',
            'Certification en préparation mentale',
            'Instructeur LesMills',
          ]}
          specialites={[
            'Préparation mentale',
            'Préparation physique',
            'Sport Santé',
            'Bien-être',
          ]}
          showContact={true}
        />
      </section>
    </div>
  );
}
