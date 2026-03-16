import Link from 'next/link';
import NavBar from './navBar';
import Image from 'next/image';

/**
 *
 * Composant représentant l'en-tête global du site.
 *
 * Le Header est responsable de :
 * - afficher le logo du site
 * - afficher le slogan principal
 * - afficher la barre de navigation (`NavBar`)
 *
 *
 * @returns {JSX.Element} Header contenant le logo, le slogan et la navigation.
 *
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
        <p className="italic">Sport Bien-être Nutrition</p>
        <NavBar />
      </div>
    </header>
  );
}
