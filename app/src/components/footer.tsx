'use client';

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

/**
 * Composant Footer : Affiche le pied de page avec liens, contact et réseaux sociaux
 * @returns {JSX.Element}
 */

export default function Footer(): JSX.Element {
  return (
    <footer className="w-full bg-background border-t-2 border-primary mt-10 py-8 text-[#D8D8D8] text-sm">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo et description */}
        <div>
          <h4 className="text-primary font-bold text-lg mb-2">LT coaching</h4>
          <p>
            Coaching personnalisé pour améliorer votre santé et votre bien-être,
            à votre rythme.
          </p>
        </div>

        {/* Liens de navigation */}
        <div>
          <h4 className="text-primary font-bold text-lg mb-2">Liens utiles</h4>
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
          <h4 className="text-primary font-bold text-lg mb-2">Contact</h4>
          <p>
            Email :{' '}
            <a
              href="mailto:contact@monsite.fr"
              className="hover:text-primary transition"
            >
              contact@gmail.com
            </a>
          </p>
          {/* <p>
            Téléphone :{' '}
            <a href="tel:0600000000" className="hover:text-primary transition">
              06 00 00 00 00
            </a>
          </p> */}

          <div className="flex space-x-6 mt-4 flex-row justify-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
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
