'use client';

import { Button } from '@/src/components/ui/button';

/**
 * Props du composant `FilterBar`.
 *
 * @template T - Type des filtres (doit être une chaîne de caractères).
 * @typedef {Object} FilterBarProps
 * @property {readonly T[]} filters - Tableau des filtres disponibles (ex: ['tous', 'sport', 'bien-être']).
 * @property {T} selectedFilter - Le filtre actuellement sélectionné.
 * @property {(filter: T) => void} onChange - Fonction callback appelée lorsqu'un filtre est cliqué.
 * @property {boolean} [showIcons=true] - Détermine si des icônes sont affichées à côté des filtres.
 * @property {string} [className] - Classes CSS supplémentaires à ajouter au conteneur.
 */

/**
 * Composant `FilterBar`
 *
 * Affiche une barre de boutons pour filtrer dynamiquement des éléments.
 * Chaque bouton représente un filtre. Le bouton sélectionné est visuellement mis en évidence.
 *
 * @template T - Type générique pour les filtres (chaîne de caractères).
 * @param {FilterBarProps<T>} props - Propriétés du composant.
 * @returns {JSX.Element} Une barre de filtres interactive avec boutons.
 *
 * @example
 * const filters = ['tous', 'sport', 'bien-être', 'nutrition'] as const;
 * const [selectedFilter, setSelectedFilter] = useState<typeof filters[number]>('tous');
 *
 * <FilterBar
 *   filters={filters}
 *   selectedFilter={selectedFilter}
 *   onChange={setSelectedFilter}
 *   showIcons={true}
 *   className="my-4"
 * />
 */

type FilterBarProps<T extends string> = {
  filters: readonly T[];
  selectedFilter: T;
  onChange: (filter: T) => void;
  showIcons?: boolean;
  className?: string;
};

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
            aria-label={`Filtrer par ${filter}`} // accessibilité
            aria-pressed={isSelected} // indique si le bouton est actif
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
