'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Services', href: '/services' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Contact', href: '/contact' },
];
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full">
      <div>{/*logo*/}</div>
      <nav>
        {/* Menu burger visible uniquement sur mobile */}
        <Button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu mobile"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Menu desktop */}
        <ul className="hidden mb:flex">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-white">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu mobile déroulant */}

      {isOpen && (
        <div className="mb:hidden">
          <ul>
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
    // <div className="flex flex-row justify-around max-w-max h-40 bg-slate-600">
    //   <p>LT Coaching</p>
    //   <ul className="flex flex-row">
    //     <li>Home</li>
    //     <li>Services</li>
    //     <li>Contact</li>
    //   </ul>
    // </div>
  );
}
