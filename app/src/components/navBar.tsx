'use client';

/**
 * @file navBar.tsx
 * Composant qui gère l'affichage du menu responsive (desktop & mobile).
 */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/src/components/ui/button';
import { Menu, X } from 'lucide-react';

/**
 * Liste des liens de navigation du menu
 * @type {{ name: string; href: string }[]}
 */

const links = [
  { name: 'Accueil', href: '/' },
  { name: 'Présentation', href: '/Presentation' },
  { name: 'Services', href: '/Services' },
  { name: 'Tarifs', href: '/Tarifs' },
  { name: 'Contact', href: '/Contact' },
];

export default function NavBar() {
  // État pour afficher/masquer le menu mobile
  const [isOpen, setIsOpen] = useState(false);
  // Récupère le chemin actuel de la page
  const pathname = usePathname();

  return (
    <>
      {/* Menu Desktop */}
      <nav className="hidden md:flex space-x-8 items-center">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            // Style conditionnel : si le lien est actif, on ajoute un soulignement doré
            className={`text-[#D8D8D8] hover:text-primary transition relative ${
              pathname === link.href
                ? 'after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary'
                : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Menu Burger (mobile uniquement) */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          className="text-primary"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ouvrir le menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background flex flex-col items-center justify-center">
          {/* Bouton fermeture */}
          <button
            className="absolute top-4 right-4 text-primary"
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={32} />
          </button>

          <ul className="space-y-6 text-xl text-center">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-[#D8D8D8] hover:text-primary transition relative ${
                    pathname === link.href
                      ? 'after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary'
                      : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
