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

'use client';

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

export default function Presentation(): JSX.Element {
  return (
    <div className="min-h-screen to-muted text-foreground">
      <section className="py-16 px-8 max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            Découvrez nos coachs
          </h1>
          <p className="text-muted-foreground text-lg">
            Des professionnels passionnés pour vous accompagner dans votre
            transformation physique et mentale.
          </p>
        </div>

        <CoachProfileCard
          name="Laurent T."
          image="/images.png"
          imageAlt="Photo de Laurent T., coach sportif"
          description="Coach sportif diplômé avec plus de 10 ans d'expérience, spécialisé en prise de masse myofibrillaire et coaching sur-mesure. Il vous accompagne avec précision et motivation, en présentiel ou à distance."
          formations={[
            'BPJEPS AF - Haltérophilie/Musculation',
            'Certification en nutrition',
          ]}
          specialites={['Nutrition']}
          experiences={['Association Gym – Val-de-Saâne']}
          showContact={true}
        />
      </section>
    </div>
  );
}
