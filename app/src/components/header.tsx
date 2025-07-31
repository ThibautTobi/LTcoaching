/**
 * @file Header.tsx
 * Composant Header avec Logo et import du composant de navigation principal de l'application.
 * Gère l'affichage du menu responsive (desktop & mobile).
 */

import Link from 'next/link';
import NavBar from './navBar';
import Image from 'next/image';

/**
 * Composant Header : Affiche une barre de navigation responsive
 * @returns {JSX.Element} Le header avec navigation desktop et mobile
 */

export default function Header() {
  return (
    <header className="w-full bg-background sticky top-0 z-50 border-b-2 border-primary">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/" aria-label="acceuil">
            <Image
              src="/LTcoaching-sansBG.png"
              width={80}
              height={80}
              alt="Logo LTcoaching"
              priority
            />
          </Link>
        </div>
        <p className="italic text-xs">Sport Bien-être Nutrition</p>
        <NavBar />
      </div>
    </header>
  );
}
