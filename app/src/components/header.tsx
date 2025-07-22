/**
 * @file Header.tsx
 * Composant Header avec Logo et import du composant de navigation principal de l'application.
 * Gère l'affichage du menu responsive (desktop & mobile).
 */

import NavBar from './navBar';
import Image from 'next/image';
import Logo from '@/public/LTcoaching-sansBG.png';
/**
 * Composant Header : Affiche une barre de navigation responsive
 * @returns {JSX.Element} Le header avec navigation desktop et mobile
 */

export default function Header() {
  return (
    <header className="w-full bg-background sticky top-0 z-50 border-b-2 border-primary mb-10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Image src={Logo} width={80} height={80} alt="Logo LTcoaching" />
        </div>
        <NavBar />
      </div>
    </header>
  );
}
