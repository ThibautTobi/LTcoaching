'use client';

import { useState, useMemo } from 'react';
import { DataService } from '@/utils/data';
import { CardService } from '@/app/src/components/card';
import { Button } from '@/src/components/ui/button';

/**
 * Liste des filtres disponibles.
 * Utilisation de `as const` pour générer un type littéral strict (meilleure sécurité TS).
 */
const filters = ['tous', 'sport', 'bien-être', 'nutrition'] as const;
type FilterType = (typeof filters)[number];

/**
 * Mapping des filtres vers leurs icônes.
 * Déclaré en dehors du composant pour éviter de recréer l'objet à chaque rendu.
 */
const icons: Record<FilterType, string> = {
  tous: '',
  sport: '🏋️',
  'bien-être': '🧘',
  nutrition: '🍏',
};

/**
 * Composant principal de la page Services.
 * - Affiche un titre et une description introductive.
 * - Propose des filtres interactifs (sport, bien-être, nutrition, tous).
 * - Rend une grille de services selon le filtre choisi.
 *
 * Optimisations apportées :
 * - `useMemo` pour éviter de recalculer la liste filtrée inutilement (meilleure performance).
 * - Extraction de `icons` hors du `.map` (évite des recréations d'objet, plus léger).
 * - Ajout d'un message si aucun service trouvé (meilleure UX).
 * - Accessibilité avec `aria-pressed` pour indiquer l'état actif des boutons.
 * - Typage strict avec `Service` pour limiter les erreurs.
 *
 * @returns {JSX.Element} Une section contenant :
 * - Un titre et un paragraphe descriptif.
 * - Une série de boutons de filtre.
 * - Une grille de services filtrés ou un message d'absence.
 */

export default function ServicesPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('tous');

  /**
   * Calcul des services filtrés.
   * `useMemo` évite de recalculer à chaque rendu si `selectedFilter` n'a pas changé.
   */

  const filteredServices = useMemo(() => {
    if (selectedFilter === 'tous') return DataService;
    return DataService.filter((service) =>
      service.categories.includes(selectedFilter)
    );
  }, [selectedFilter]);

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-[24px] font-bold text-center text-[#C6A35E] mb-8">
        Nos Services de Coaching Sportif, Nutrition & Bien-être
      </h1>

      <p className="text-center max-w-2xl mx-auto mb-10 text-gray-300">
        LT Coaching vous accompagne dans votre transformation physique et
        mentale.
        <br />
        Découvrez nos services sur mesure adaptés à vos objectifs :<br /> perte
        de poids, prise de masse, amélioration des performances, bien-être et
        équilibre alimentaire.
      </p>

      {/* Boutons de filtre */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter;

          return (
            <Button
              key={filter}
              aria-pressed={isSelected} // Accessibilité : indique si le bouton est actif
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
        {filteredServices.length > 0 ? (
          filteredServices.map((data) => (
            <div id={data.id} key={data.id}>
              <CardService
                DataService={data}
                showDescription={true}
                showListe={true}
                showLink={true}
                showImage={true}
                showPrice={false}
              />
            </div>
          ))
        ) : (
          // Message si aucun service n'est trouvé pour le filtre sélectionné
          <p className="text-center col-span-full text-[#C6A35E] italic">
            Aucun service trouvé pour ce filtre.
          </p>
        )}
      </div>
    </section>
  );
}
