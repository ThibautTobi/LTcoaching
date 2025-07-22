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

import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { LucideMapPin, LucideBookOpen } from 'lucide-react';
import Image from 'next/image';

export default function Presentation() {
  return (
    <div className="min-h-screen to-muted text-foreground">
      <section className="py-16 px-4 max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            Découvrez nos coachs
          </h1>
          <p className="text-muted-foreground text-lg">
            Des professionnels passionnés pour vous accompagner dans votre
            transformation physique et mentale.
          </p>
        </div>

        {/* COACH 1 */}
        <article className="flex flex-col md:flex-row items-center gap-8 bg-card shadow-xl p-8 rounded-2xl transition-transform hover:scale-105 duration-300 ease-in-out">
          <div className="md:w-1/2 text-center">
            <Image
              src="/"
              alt="Photo de Laurent T., coach sportif"
              width={256}
              height={256}
              className="rounded-full object-cover border-4 border-primary mx-auto"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-primary">Laurent T.</h2>
            <p className="text-muted-foreground text-justify">
              Coach sportif diplômé avec plus de 10 ans d&apos;expérience,
              spécialisé en prise de masse myofibrillaire et coaching
              sur-mesure. Il vous accompagne avec précision et motivation, en
              présentiel ou à distance.
            </p>

            {/* Formations */}
            <div>
              <h3 className="font-semibold text-lg">Formations :</h3>
              <ul
                className="space-y-1 text-sm"
                aria-label="Formations de Laurent"
              >
                <li className="flex items-center gap-2">
                  <LucideBookOpen className="w-4 h-4 text-primary" /> BPJEPS AF
                  - Haltérophilie/Musculation
                </li>
                <li className="flex items-center gap-2">
                  <LucideBookOpen className="w-4 h-4 text-primary" />{' '}
                  Certification en nutrition du sport
                </li>
              </ul>
            </div>

            {/* Salles */}
            <div>
              <h3 className="font-semibold text-lg">Salles :</h3>
              <ul
                className="space-y-1 text-sm"
                aria-label="Salles de coaching de Laurent"
              >
                <li className="flex items-center gap-2">
                  <LucideMapPin className="w-4 h-4 text-primary" /> Basic-Fit –
                  Le Havre
                </li>
                <li className="flex items-center gap-2">
                  <LucideMapPin className="w-4 h-4 text-primary" /> Foyer Rural
                  – Val-de-Saâne
                </li>
              </ul>
            </div>

            <Link href="/Contact">
              <Button variant="outline" className="mt-4">
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </article>

        {/* COACH 2 */}
        <article className="flex flex-col md:flex-row-reverse items-center gap-8 bg-primary/10 shadow-lg p-8 rounded-2xl transition-transform hover:scale-105 duration-300 ease-in-out">
          <div className="md:w-1/2 text-center">
            <Image
              src="/"
              alt="Photo de Marion B., coach bien-être"
              width={256}
              height={256}
              className="rounded-full object-cover border-4 border-primary mx-auto"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-primary">Marion B.</h2>
            <p className="text-muted-foreground text-justify">
              Spécialiste du bien-être féminin, Marion propose des séances
              personnalisées avec une approche douce et efficace, adaptée à
              toutes les étapes de la vie : renforcement, post-partum, mobilité.
            </p>

            {/* Formations */}
            <div>
              <h3 className="font-semibold text-lg">Formations :</h3>
              <ul
                className="space-y-1 text-sm"
                aria-label="Formations de Marion"
              >
                <li className="flex items-center gap-2">
                  <LucideBookOpen className="w-4 h-4 text-primary" /> Licence
                  STAPS - APA Santé
                </li>
                <li className="flex items-center gap-2">
                  <LucideBookOpen className="w-4 h-4 text-primary" /> Pilates &
                  Yoga thérapeutique
                </li>
              </ul>
            </div>

            {/* Salles */}
            <div>
              <h3 className="font-semibold text-lg">Salles :</h3>
              <ul
                className="space-y-1 text-sm"
                aria-label="Salles de coaching de Marion"
              >
                <li className="flex items-center gap-2">
                  <LucideMapPin className="w-4 h-4 text-primary" /> Studio
                  Pilates – Yvetot
                </li>
                <li className="flex items-center gap-2">
                  <LucideMapPin className="w-4 h-4 text-primary" /> Coaching à
                  domicile
                </li>
              </ul>
            </div>

            <Link href="/Contact">
              <Button variant="outline" className="mt-4">
                Découvrir ses séances
              </Button>
            </Link>
          </div>
        </article>

        {/* Appel à l’action final */}
        <div className="text-center pt-12 animate-fade-in">
          <Link href="/contact">
            <Button className="px-8 py-3 rounded-full text-base shadow-md hover:bg-primary/90">
              Contactez-nous
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
