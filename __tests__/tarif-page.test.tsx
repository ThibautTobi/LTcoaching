import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TarifsPage from '@/app/tarifs/page';
import { DataType } from '@/utils/data';

// --- 🔹 MOCKS ---

// Mock propre de DataService
jest.mock('@/utils/data', () => ({
  DataService: [
    {
      id: '1',
      title: 'Coaching Sportif',
      categories: ['sport'],
      image: '/sport.jpg',
      imageAlt: 'Coaching Sportif',
      description: 'Un coaching personnalisé',
      liste: ['Objectif', 'Résultat'],
      price: '50',
    },
    {
      id: '2',
      title: 'Massage Bien-être',
      categories: ['bien-être'],
      image: '/massage.jpg',
      imageAlt: 'Massage Bien-être',
      description: 'Un moment de détente',
      liste: ['Relaxation', 'Bien-être'],
      price: '60',
    },
    {
      id: '3',
      title: 'Conseil Nutrition',
      categories: ['nutrition'],
      image: '/nutrition.jpg',
      imageAlt: 'Conseil Nutrition',
      description: 'Des conseils alimentaires adaptés',
      liste: ['Équilibre', 'Santé'],
      price: '40',
    },
    {
      id: '4',
      title: 'Pack Complet',
      categories: ['sport', 'nutrition'],
      image: '/pack.jpg',
      imageAlt: 'Pack Complet',
      description: 'Sport + Nutrition pour des résultats rapides',
      liste: ['Programme sport', 'Suivi nutritionnel'],
      price: '90',
    },
  ] satisfies DataType[],
}));

// Mock du composant CardService
jest.mock('@/app/src/components/card', () => ({
  CardService: ({ DataService }: { DataService: DataType }) => (
    <div data-testid="card">{DataService.title}</div>
  ),
}));

// Typage correct pour FilterBar
type FilterBarProps = {
  filters: string[];
  selectedFilter: string;
  onChange: (filter: string) => void;
};

// Mock du composant FilterBar
jest.mock('@/app/src/components/filterComposant', () => ({
  FilterBar: ({ filters, onChange }: FilterBarProps) => (
    <div data-testid="filter-bar">
      {filters.map((filter) => (
        <button key={filter} onClick={() => onChange(filter)}>
          {filter}
        </button>
      ))}
    </div>
  ),
}));

// --- 🔹 TESTS ---
describe('TarifsPage Component', () => {
  it('doit rendre le titre principal et tous les services par défaut', () => {
    render(<TarifsPage />);
    const heading = screen.getByRole('heading', { name: /Tarifs/i });
    expect(heading).toBeInTheDocument();

    // Vérifie que toutes les cartes de service sont affichées
    expect(screen.getAllByTestId('card')).toHaveLength(4);
  });

  it('doit filtrer les services par catégorie', () => {
    render(<TarifsPage />);

    // Filtre "sport"
    fireEvent.click(screen.getByRole('button', { name: /sport/i }));
    let visibleCards = screen
      .getAllByTestId('card')
      .map((el) => el.textContent);
    expect(visibleCards).toEqual(
      expect.arrayContaining(['Coaching Sportif', 'Pack Complet'])
    );
    expect(visibleCards).toHaveLength(2);

    // Filtre "bien-être"
    fireEvent.click(screen.getByRole('button', { name: /bien-être/i }));
    visibleCards = screen.getAllByTestId('card').map((el) => el.textContent);
    expect(visibleCards).toEqual(expect.arrayContaining(['Massage Bien-être']));
    expect(visibleCards).toHaveLength(1);

    // Filtre "nutrition"
    fireEvent.click(screen.getByRole('button', { name: /nutrition/i }));
    visibleCards = screen.getAllByTestId('card').map((el) => el.textContent);
    expect(visibleCards).toEqual(
      expect.arrayContaining(['Conseil Nutrition', 'Pack Complet'])
    );
    expect(visibleCards).toHaveLength(2);
  });

  it('doit réinitialiser les services lorsque le filtre "tous" est cliqué', () => {
    render(<TarifsPage />);

    fireEvent.click(screen.getByRole('button', { name: /sport/i }));
    expect(screen.getAllByTestId('card')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: /tous/i }));
    expect(screen.getAllByTestId('card')).toHaveLength(4);
  });
});
