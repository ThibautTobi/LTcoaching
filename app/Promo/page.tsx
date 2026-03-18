'use client';

import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

/**
 * Page des promos des coachs LT Coaching.
 *
 * Cette page contient :
 * - Les promos actuel
 * - Lien de retour a la page d'acceuil "/"
 *
 * @returns {JSX.Element} Page Promo
 */

export default function Promo() {
  return (
    <section className="max-w-5xl mx-auto py-12">
      <h1 className="text-center text-primary text-xl m-4">
        Promotions et Offres
      </h1>
      <p className="font-semibold text-center px-4 m-4">
        10 séances de coaching <strong className="text-primary">350 €</strong>{' '}
        au lieu de <strong className="line-through text-primary">450 €</strong>
      </p>
      <p className="font-semibold text-center px-4 m-4">
        5 séances de réflexologie{' '}
        <strong className="text-primary">215 €</strong> au lieu de{' '}
        <strong className="line-through text-primary">225 €</strong>
      </p>
      <p className="font-semibold text-center px-4 m-4">
        Rituel bain sensoriel nourrisson à domicile{' '}
        <strong className="text-primary">100 €</strong> au lieu de{' '}
        <strong className="line-through text-primary">170 €</strong>
      </p>
      <p className="font-semibold text-center px-4 m-4">
        Plan nutritionnel <strong className="text-primary">100 €</strong> au
        lieu de <strong className="line-through text-primary">200 €</strong>
      </p>

      <Button
        variant={'default'}
        className="mt-6 block mx-auto hover:scale-110 hover:bg-primary/70"
      >
        <Link href={'/'}> Acceuil </Link>
      </Button>
    </section>
  );
}
