'use client';

import Link from 'next/link';
// voir integration d'un lottie pour un beau visuel d'animation

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-2 text-primary">
        404 – Page introuvable
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Retournez
        à l&apos;accueil ou explorez les services proposés.
      </p>

      <Link
        href="/"
        className="px-5 py-2 bg-primary text-white rounded-xl shadow-md hover:bg-primary/80 transition hover:scale-110"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
