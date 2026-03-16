'use client';

import { Button } from '@/src/components/ui/button';

/**
 * Type des propriétés du composant FilterBar
 *
 * Composant générique permettant d'afficher une barre
 * de filtres sous forme de boutons interactifs.
 *
 * @template T
 * Type générique représentant les valeurs possibles
 * du filtre. Il doit être une chaîne (`string`).
 *
 *
 * @typedef {Object} FilterBarProps
 *
 * @property {readonly T[]} filters
 * Liste des filtres disponibles.
 *
 * @property {T} selectedFilter
 * Filtre actuellement sélectionné.
 *
 * @property {(filter: T) => void} onChange
 * Fonction appelée lorsqu'un filtre est sélectionné.
 * Permet généralement de mettre à jour un `useState`.
 *
 * @property {boolean} [showIcons=true]
 * Détermine si les icônes doivent être affichées
 * à côté des filtres.
 *
 * @property {string} [className]
 * Classes CSS supplémentaires appliquées au conteneur.
 */

type FilterBarProps<T extends string> = {
  filters: readonly T[];
  selectedFilter: T;
  onChange: (filter: T) => void;
  showIcons?: boolean;
  className?: string;
};

/**
 * Composant FilterBar
 *
 * Barre de filtres générique affichant des boutons
 * permettant de filtrer dynamiquement un contenu.
 *
 * Fonctionnalités :
 * - boutons interactifs
 * - mise en évidence du filtre actif
 * - support d'icônes optionnelles
 * - accessibilité (`aria-pressed`, `aria-label`)
 *
 * Ce composant est générique (`T extends string`)
 * pour garantir que les filtres utilisés soient
 * strictement typés.
 *
 * @template T
 *
 * @param {FilterBarProps<T>} props
 * Propriétés du composant.
 *
 * @returns {JSX.Element}
 * Barre de boutons permettant de filtrer un contenu.
 *
 */

export function FilterBar<T extends string>({
  filters,
  selectedFilter,
  onChange,
  showIcons = true,
  className = '',
}: FilterBarProps<T>) {
  // Mapping des filtres vers des icônes pour un affichage visuel
  const icons: Record<string, string> = {
    tous: '',
    sport: '🏋️',
    'bien-être': '🧘',
    nutrition: '🍏',
  };

  return (
    <div className={`flex justify-center gap-4 mb-8 flex-wrap ${className}`}>
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter;

        return (
          <Button
            key={filter}
            aria-label={`Filtrer par ${filter}`}
            aria-pressed={isSelected}
            onClick={() => onChange(filter)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition duration-200 ease-in-out
              ${
                isSelected
                  ? 'bg-card text-primary font-semibold border-2 border-primary'
                  : 'bg-card border-white text-white hover:bg-[#C6A35E]/20'
              }
            `}
          >
            {showIcons && <span>{icons[filter]}</span>}
            <span className="capitalize">{filter}</span>
          </Button>
        );
      })}
    </div>
  );
}
