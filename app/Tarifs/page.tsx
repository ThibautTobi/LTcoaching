'use client';

import { useState } from 'react';
import { DataService } from '@/utils/data';
import { CardService } from '@/app/src/components/card';
import { FilterBar } from '@/app/src/components/filterComposant';

/**
 * redirection avec plus d'information sur chaque service en reflexion
 */

/**
 * Page React affichant les tarifs des services de coaching.
 *
 * Cette page liste tous les services disponibles (sport, nutrition, bien-être, etc.)
 * sous forme de cartes uniformes, en utilisant le composant réutilisable `CardService`.
 * Chaque carte affiche le titre, la description et l’image du service.
 *
 * @page TarifsPage
 * @returns {JSX.Element} Le contenu JSX de la page des tarifs.
 *
 * @example
 * // Utilisation dans une route Next.js :
 * export default function Page() {
 *   return <TarifsPage />;
 * }
 */

const filters = ['tous', 'sport', 'bien-être', 'nutrition'] as const;
type FilterType = (typeof filters)[number];

export default function TarifsPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('tous');

  // Filtrage dynamique des services
  const filteredServices =
    selectedFilter === 'tous'
      ? DataService
      : DataService.filter((service) =>
          service.categories.includes(selectedFilter)
        );

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-center text-[#C6A35E] mb-6">
        Tarifs
      </h1>
      {/* composant de Filtre des services */}
      <FilterBar
        filters={filters}
        selectedFilter={selectedFilter}
        onChange={setSelectedFilter}
      />

      {/* Grille responsive contenant les services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredServices.map((data) => (
          <CardService
            key={data.id}
            DataService={data}
            showDescription={false}
            showListe={false}
            showImage={true}
            showLink={false}
            showPrice={true}
          />
        ))}
      </div>
    </section>
  );
}
