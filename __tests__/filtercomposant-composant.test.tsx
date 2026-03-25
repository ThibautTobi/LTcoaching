import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterBar } from '@/src/components/sections/filterComposant';

// Définition stricte du type attendu par le composant Button
type MockButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
};

// On "mocke" le composant Button de shadcn/ui pour isoler le test de FilterBar
// Cela évite que son style ou son implémentation interne interfère dans les tests
jest.mock('@/src/components/ui/button', () => ({
  Button: ({ children, onClick, className }: MockButtonProps) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

describe('FilterBar', () => {
  // Liste de filtres utilisée dans tous les tests
  const filters = ['tous', 'sport', 'nutrition'] as const;

  // Mock de la fonction onChange passée en prop
  const mockOnChange = jest.fn();

  // Avant chaque test → réinitialiser les mocks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('doit rendre un bouton pour chaque filtre', () => {
    render(
      <FilterBar
        filters={filters}
        selectedFilter="tous"
        onChange={mockOnChange}
      />
    );

    // Vérifie que tous les boutons sont rendus
    filters.forEach((filter) => {
      expect(
        screen.getByRole('button', { name: new RegExp(filter, 'i') })
      ).toBeInTheDocument();
    });
  });

  it('doit appliquer la classe correcte au filtre sélectionné', () => {
    render(
      <FilterBar
        filters={filters}
        selectedFilter="sport"
        onChange={mockOnChange}
      />
    );

    const selectedButton = screen.getByRole('button', { name: /sport/i });
    const unselectedButton = screen.getByRole('button', { name: /tous/i });

    // Le bouton sélectionné doit avoir la classe spécifique
    expect(selectedButton).toHaveClass('font-semibold border-2 border-primary');

    // Un bouton non sélectionné ne doit pas avoir la classe de sélection
    expect(unselectedButton).toHaveClass('border-white');
    expect(unselectedButton).not.toHaveClass(
      'font-semibold border-2 border-primary'
    );
  });

  it('doit appeler le callback onChange avec le bon filtre lors du clic', () => {
    render(
      <FilterBar
        filters={filters}
        selectedFilter="tous"
        onChange={mockOnChange}
      />
    );

    const nutritionButton = screen.getByRole('button', { name: /nutrition/i });
    fireEvent.click(nutritionButton);

    // Vérifie que le callback a bien été appelé
    expect(mockOnChange).toHaveBeenCalledTimes(1);

    // Vérifie que la valeur correspond bien au filtre cliqué
    expect(mockOnChange).toHaveBeenCalledWith('nutrition');
  });

  it("ne doit pas afficher d'icônes si showIcons est faux", () => {
    render(
      <FilterBar
        filters={filters}
        selectedFilter="tous"
        onChange={mockOnChange}
        showIcons={false} // <- clé du test
      />
    );

    // Vérifie que les icônes ne sont PAS affichées
    expect(screen.queryByText('🏋️')).not.toBeInTheDocument();
    expect(screen.queryByText('🍏')).not.toBeInTheDocument();
  });

  it('doit afficher les icônes si showIcons est vrai (par défaut)', () => {
    render(
      <FilterBar
        filters={filters}
        selectedFilter="tous"
        onChange={mockOnChange}
      />
    );

    // Vérifie que les icônes sont bien rendues quand showIcons est activé
    expect(screen.getByText('🏋️')).toBeInTheDocument();
    expect(screen.getByText('🍏')).toBeInTheDocument();
  });

  it('ne doit rien rendre si le tableau filters est vide', () => {
    render(
      <FilterBar filters={[]} selectedFilter="tous" onChange={mockOnChange} />
    );

    // Vérifie qu’il n’y a pas de bouton si aucun filtre n’est fourni
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
