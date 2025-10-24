'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

/**
 * Composant Footer : Affiche le pied de page avec liens, contact et réseaux sociaux
 * @returns {JSX.Element}
 */

export default function Footer(): JSX.Element {
  return (
    <footer className="w-full bg-background border-t-2 border-primary mt-10 py-8 text-[#D8D8D8] text-sm">
      <h2 className="text-[24px] text-muted-foreground font-bold text-center italic mb-6">
        Sport Bien-être Nutrition
      </h2>
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo et description */}
        <div>
          <Link href="/" aria-label="acceuil">
            <Image
              src="/LTcoaching-sansBG.png"
              width={80}
              height={80}
              alt="Logo LTcoaching"
              priority
            />
          </Link>
          <p>Sport Bien-être Nutrition.</p>
        </div>

        {/* Liens de navigation */}
        <div>
          <h3 className="text-primary font-bold text-lg mb-2">Liens utiles</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/Presentation"
                className="hover:text-primary transition"
              >
                Présentation
              </Link>
            </li>
            <li>
              <Link href="/Services" className="hover:text-primary transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/Tarifs" className="hover:text-primary transition">
                Tarifs
              </Link>
            </li>
            <li>
              <Link href="/Contact" className="hover:text-primary transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact et Réseaux sociaux */}
        <div>
          <h3 className="text-primary font-bold text-lg mb-2">Contact</h3>
          <p>
            Email :{' '}
            <a
              href="mailto:ltcoaching.contact@gmail.com"
              className="hover:text-primary transition"
            >
              ltcoaching.contact@gmail.com
            </a>
          </p>
          <p>
            Téléphone :{' '}
            <a href="tel:0769330837" className="hover:text-primary transition">
              07 69 33 08 37
            </a>
          </p>

          <div className="flex space-x-6 mt-4 flex-row justify-start">
            <a
              href="https://facebook.com/profile.php?id=100078540893893"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com/ltcoaching.sportnutrition?utm_source=qrnigsh=aDViNW4yZ2gyMGpi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-[#999] mt-8">
        &copy; {new Date().getFullYear()} LT Coaching. Tous droits réservés.
      </div>
    </footer>
  );
}
