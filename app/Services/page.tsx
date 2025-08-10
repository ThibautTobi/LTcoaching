'use client';

import { useState } from 'react';
import { DataService } from '@/utils/data';
import { CardService } from '@/app/src/components/card';
import { Button } from '@/src/components/ui/button';

const filters = ['tous', 'sport', 'bien-être', 'nutrition'] as const;
type FilterType = (typeof filters)[number];

/**
 * Composant principal de la page Services.
 * Affiche une liste de services (coaching, nutrition, bien-être, etc.) avec un système de filtres interactifs.
 *
 * @returns {JSX.Element} Une section contenant :
 *  - un titre
 *  - des boutons de filtres
 *  - une grille des services filtrés
 */

export default function ServicesPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('tous');

  const filteredServices =
    selectedFilter === 'tous'
      ? DataService
      : DataService.filter((service) =>
          service.categories.includes(selectedFilter)
        );

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-[#C6A35E] mb-8">
        Nos Services de Coaching & Nutrition
      </h1>

      {/* Boutons de filtre */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter;

          // Icônes personnalisées par filtre
          const icons: Record<FilterType, string> = {
            tous: '',
            sport: '🏋️',
            'bien-être': '🧘',
            nutrition: '🍏',
          };

          return (
            <Button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition duration-200 ease-in-out
          ${
            isSelected
              ? 'bg-card text-primary font-semibold border-2 border-primary'
              : 'bg-card border-white text-white hover:bg-[#C6A35E]/20'
          }
        `}
            >
              <span>{icons[filter]}</span>
              <span className="capitalize">{filter}</span>
            </Button>
          );
        })}
      </div>
      {/* Grille de services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((data) => (
          <div id={data.id} key={data.id}>
            <CardService
              DataService={data}
              showDescription={true}
              showListe={false}
              showLink={true}
              showImage={true}
              showPrice={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
