import { Metadata } from 'next';
import CoachProfileCard from '@/src/components/sections/coachCard';

/**
 * Page de présentation des coachs LT Coaching.
 *
 * Cette page affiche les profils des coachs sportifs à l'aide
 * du composant `CoachProfileCard`.
 *
 * Fonctionnalités principales :
 * - Affichage des informations détaillées des coachs (photo, description, formations, spécialités)
 * - Intégration de données structurées Schema.org (JSON-LD) pour améliorer le SEO
 * - Configuration des métadonnées SEO via l'API `metadata` de Next.js
 *
 * @returns {JSX.Element} Page de présentation des coachs.
 */

/**
 * Métadonnées pour la page (SEO + réseaux sociaux).
 *
 * Next.js utilise automatiquement cette constante pour générer
 * les balises `<title>`, `<meta>` et les données OpenGraph
 * utilisées lors du partage sur les réseaux sociaux.
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
 * Composant principal affichant la page de présentation.
 *
 * Contient :
 * - les données structurées Schema.org pour Google
 * - la section de présentation du coaching
 * - deux cartes de profil (`CoachProfileCard`)
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

      {/* Section principale de présentation */}

      <section className="py-16 px-8 max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-2">
          <h1 className="text-[24px] font-bold text-primary mb-4">
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

        {/* Carte de profil : Laure */}
        <CoachProfileCard
          name="Laure"
          image="/coachFille.webp"
          imageAlt="Laure, coach sportif experte en yoga, nutrition et bien-être"
          description="Coach sportif diplômée avec plus de 7 ans d'expérience, spécialisée dans le bien-être, la nutrition et la remise en forme. Professeure de yoga et de pilates, également réflexologue plantaire, palmaire et crânienne pour adultes et nourrissons."
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
        {/* Carte de profil : Thibaut */}
        <CoachProfileCard
          name="Thibaut"
          image="/coachGarcon.webp"
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
