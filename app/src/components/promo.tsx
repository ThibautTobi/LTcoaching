'use client';

import Link from 'next/link';
export default function PromoBande() {
  // ajouter un onclick avec redirection pour une page Offre et promotion
  return (
    <Link href="/Promo">
      <div className="relative overflow-hidden bg-primary text-white py-3 text-2xl cursor-pointer hover:bg-primary/90 transition-colors">
        {/* Effets dégradés aux bords */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-primary to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-primary to-transparent z-10"></div>

        {/* Texte défilant + pause au survol */}
        <p className="animate-band md:animate-bandMB lg:animate-bandLG xl:animate-bandXL hover:[animation-play-state:paused] whitespace-nowrap font-semibold text-center px-4 tracking-wide">
          🎉 <strong>Promo</strong> : 10 séances de coaching{' '}
          <strong className="text-card">350 €</strong> au lieu de{' '}
          <strong className="line-through text-card">450 €</strong> / 5 séances
          de réflexologie <strong className="text-card">215 €</strong> au lieu
          de <strong className="line-through text-card">225 €</strong> / Rituel
          bain sensoriel nourrisson à domicile{' '}
          <strong className="text-card">100 €</strong> au lieu de{' '}
          <strong className="line-through text-card">170 €</strong> / Plan
          nutritionnel <strong className="taxt-card">100 €</strong> au lieu de{' '}
          <strong className="line-through text-card">200 €</strong>
        </p>
      </div>
    </Link>
  );
}
