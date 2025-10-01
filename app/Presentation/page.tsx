import { Metadata } from 'next';
import CoachProfileCard from '@/app/src/components/coachCard';

/**
 * @file Presentation.tsx
 * @description Ce composant présente les profils des coachs sportifs.
 *              Il utilise des cartes de profil (`CoachProfileCard`) pour afficher
 *              des informations détaillées : nom, photo, description, formations,
 *              spécialités et un bouton de contact.
 *
 * @remarks
 * - Intègre des données structurées (Schema.org en JSON-LD) pour le SEO.
 * - Utilise `metadata` de Next.js pour générer les balises `<title>`, `<meta>` et OpenGraph.
 *
 * @component
 * @example
 * ```tsx
 * import Presentation from '@/app/Presentation';
 *
 * export default function Page() {
 *   return <Presentation />;
 * }
 * ```
 */

/**
 * Métadonnées pour la page (SEO + réseaux sociaux).
 * Next.js lira automatiquement cette constante et l'injectera dans le `<head>`.
 *
 * @type {Metadata}
 */

export const metadata: Metadata = {
  title: 'Présentation – LT Coaching | Coach Sportif, Nutrition & Bien-être',
  description:
    "Découvrez Laure et Thibaut, coachs sportifs diplômés avec plus de 7 ans d'expérience. Spécialistes en préparation physique, nutrition, bien-être et sport santé.",
  openGraph: {
    title: 'Nos coachs sportifs – LTcoaching',
    description:
      "Rencontrez notre équipe de coachs diplômés : préparation physique, nutrition, bien-être, sport santé. Plus de 7 ans d'expérience pour vous accompagner.",
    images: ['/og-ltcoaching.webp'],
  },
};

/**
 * @function Presentation
 * @description Affiche la section de présentation des coachs.
 *              Contient les données structurées Schema.org pour Google
 *              et deux cartes de profil `CoachProfileCard` (Laure et Thibaut).
 *
 * @returns {JSX.Element} Composant React représentant la page de présentation.
 */

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

        {/* Carte pour Laure */}
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
        {/* Carte pour Thibaut */}
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
