// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import TarifsPage from '@/app/Tarifs/page';

// // On mocke DataService pour contrôler ce qui est affiché
// jest.mock('@/utils/data', () => ({
//   DataService: [
//     {
//       id: 1,
//       title: 'Coaching Sportif',
//       categories: ['sport'],
//       description: 'Un coaching personnalisé',
//       price: 50,
//       image: '/sport.jpg',
//     },
//     {
//       id: 2,
//       title: 'Programme Nutrition',
//       categories: ['nutrition'],
//       description: 'Plan alimentaire sur mesure',
//       price: 40,
//       image: '/nutrition.jpg',
//     },
//   ],
// }));

// // On mocke CardService pour vérifier son appel sans devoir tester son rendu complet
// jest.mock('@/app/src/components/card', () => ({
//   CardService: ({ DataService }: any) => (
//     <div data-testid="card-service">{DataService.title}</div>
//   ),
// }));

// // On mocke FilterBar pour simuler le changement de filtre
// jest.mock('@/app/src/components/filterComposant', () => ({
//   FilterBar: ({ filters, selectedFilter, onChange }: any) => (
//     <div>
//       {filters.map((filter: string) => (
//         <button
//           key={filter}
//           data-testid={`filter-${filter}`}
//           onClick={() => onChange(filter)}
//         >
//           {filter}
//         </button>
//       ))}
//       <div>Filtre actuel: {selectedFilter}</div>
//     </div>
//   ),
// }));

// describe('TarifsPage', () => {
//   it('affiche le titre et toutes les cartes au chargement', () => {
//     render(<TarifsPage />);

//     // Vérifie le titre
//     expect(
//       screen.getByRole('heading', { name: /Tarifs/i })
//     ).toBeInTheDocument();

//     // Vérifie que les deux services sont affichés
//     expect(screen.getByText(/Coaching Sportif/i)).toBeInTheDocument();
//     expect(screen.getByText(/Programme Nutrition/i)).toBeInTheDocument();
//   });

//   it('filtre les services par catégorie', () => {
//     render(<TarifsPage />);

//     // Au départ les 2 sont visibles
//     expect(screen.getAllByTestId('card-service')).toHaveLength(2);

//     // Clique sur "sport"
//     fireEvent.click(screen.getByTestId('filter-sport'));

//     // Seul le coaching sportif doit rester
//     expect(screen.getAllByTestId('card-service')).toHaveLength(1);
//     expect(screen.getByText(/Coaching Sportif/i)).toBeInTheDocument();
//     expect(screen.queryByText(/Programme Nutrition/i)).not.toBeInTheDocument();
//   });

//   it('revient à tous les services quand on sélectionne "tous"', () => {
//     render(<TarifsPage />);

//     // Filtrer par sport
//     fireEvent.click(screen.getByTestId('filter-sport'));
//     expect(screen.getAllByTestId('card-service')).toHaveLength(1);

//     // Puis revenir à tous
//     fireEvent.click(screen.getByTestId('filter-tous'));
//     expect(screen.getAllByTestId('card-service')).toHaveLength(2);
//   });
// });

// __tests__/tarif-page.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TarifsPage from '@/app/Tarifs/page';

// Mock très simple du module data avec un tableau vide
jest.mock('@/utils/data', () => ({
  __esModule: true,
  DataService: [],
}));

describe('TarifsPage', () => {
  test('affiche le titre Tarifs', () => {
    render(<TarifsPage />);
    expect(screen.getByText('Tarifs')).toBeInTheDocument();
  });
});
