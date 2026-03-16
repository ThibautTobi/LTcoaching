'use client';

import { useState, useMemo } from 'react';
import { DataService } from '@/utils/data';
import { CardService } from '@/src/components/sections/card';
import { Button } from '@/src/components/ui/button';

const filters = ['tous', 'sport', 'bien-être', 'nutrition'] as const;
type FilterType = (typeof filters)[number];

/**
 * Mapping des filtres vers leurs icônes.
 * Déclaré en dehors du composant pour éviter de recréer l'objet à chaque rendu.
 * @type {Record<FilterType, string>}
 */
const icons: Record<FilterType, string> = {
  tous: '',
  sport: '🏋️',
  'bien-être': '🧘',
  nutrition: '🍏',
};

/**
 * Page affichant les services de LT Coaching.
 *
 * Fonctionnalités :
 * - Affichage des services disponibles
 * - Filtrage dynamique par catégorie
 * - Mise à jour de l’interface selon le filtre sélectionné
 *
 * Structure de la page :
 * - titre
 * - description
 * - filtres interactifs
 * - grille de services
 *
 * @returns {JSX.Element} Page des services avec filtrage dynamique.
 */

export default function ServicesPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('tous');

  /**
   * Liste des services filtrés.
   *
   * `useMemo` permet de recalculer la liste uniquement
   * lorsque le filtre change.
   *
   * Sans `useMemo`, le filtrage serait recalculé
   * à chaque rendu du composant.
   *
   * @returns {Service[]} Liste des services correspondant au filtre actif.
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
        <br />
        Découvrez nos services sur mesure adaptés à vos objectifs :
        <br />
        <br />
        perte de poids, prise de masse, amélioration des performances, bien-être
        et équilibre alimentaire.
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
                showLink={false}
                showImage={true}
                showPrice={true}
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
