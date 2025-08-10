'use client';

import { Button } from '@/src/components/ui/button';

type FilterBarProps<T extends string> = {
  // tableau de filtres (ex: ['tous', 'sport', 'nutrition'])
  filters: readonly T[];
  selectedFilter: T;
  // callback quand on clique sur un filtre
  onChange: (filter: T) => void;
  showIcons?: boolean;
  className?: string;
};

/**
 * Composant FilterBar
 * Affiche une barre de boutons pour filtrer dynamiquement des éléments
 */
export function FilterBar<T extends string>({
  filters,
  selectedFilter,
  onChange,
  showIcons = true,
  className = '',
}: FilterBarProps<T>) {
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
