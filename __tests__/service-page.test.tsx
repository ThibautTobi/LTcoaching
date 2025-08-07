// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import ServicesPage from '@/app/Services/page';

// // // On mock DataService
// // jest.mock('@/utils/data', () => ({
// //   DataService: [
// //     { id: '1', title: 'Coaching Sportif', categories: ['sport'] },
// //     { id: '2', title: 'Massage Bien-être', categories: ['bien-être'] },
// //     { id: '3', title: 'Conseil Nutrition', categories: ['nutrition'] },
// //     { id: '4', title: 'Pack Complet', categories: ['sport', 'nutrition'] },
// //   ],
// // }));

// import { dataType } from '@/utils/data';

// jest.mock('@/utils/data', () => ({
//   DataService: [
//     {
//       id: '1',
//       title: 'Coaching Sportif',
//       categories: ['sport'],
//       image: '/sport.jpg',
//       imageAlt: 'Coaching Sportif',
//       Description: 'Un coaching personnalisé',
//       liste: ['Objectif', 'Résultat'],
//       price: '50',
//     },
//     {
//       id: '2',
//       title: 'Programme Nutrition',
//       categories: ['nutrition'],
//       image: '/nutrition.jpg',
//       imageAlt: 'Programme Nutrition',
//       Description: 'Plan alimentaire sur mesure',
//       liste: ['Suivi', 'Plan'],
//       price: '40',
//     },
//   ] satisfies dataType[],
// }));

// // On mock CardService pour simplifier l’affichage
// jest.mock('@/app/src/components/card', () => ({
//   CardService: (props: any) => (
//     <div data-testid="card">{props.DataService.title}</div>
//   ),
// }));

// // On mock Button pour éviter les styles complexes
// jest.mock('@/src/components/ui/button', () => ({
//   Button: (props: any) => <button {...props}>{props.children}</button>,
// }));

// describe('ServicesPage Component', () => {
//   it('affiche le titre principal', () => {
//     render(<ServicesPage />);
//     expect(
//       screen.getByRole('heading', {
//         name: /Nos Services de Coaching & Nutrition/i,
//       })
//     ).toBeInTheDocument();
//   });

//   it('affiche tous les boutons de filtre', () => {
//     render(<ServicesPage />);
//     const filters = ['tous', 'sport', 'bien-être', 'nutrition'];
//     filters.forEach((filter) => {
//       expect(
//         screen.getByRole('button', { name: new RegExp(filter, 'i') })
//       ).toBeInTheDocument();
//     });
//   });

//   it('affiche tous les services au chargement', () => {
//     render(<ServicesPage />);
//     expect(screen.getAllByTestId('card')).toHaveLength(4);
//   });

//   it('filtre les services par catégorie', () => {
//     render(<ServicesPage />);

//     // On clique sur "sport"
//     fireEvent.click(screen.getByRole('button', { name: /sport/i }));

//     // On ne doit avoir que ceux avec catégorie "sport"
//     const visibleCards = screen
//       .getAllByTestId('card')
//       .map((el) => el.textContent);
//     expect(visibleCards).toEqual(
//       expect.arrayContaining(['Coaching Sportif', 'Pack Complet'])
//     );
//     expect(visibleCards).toHaveLength(2);

//     // On clique sur "bien-être"
//     fireEvent.click(screen.getByRole('button', { name: /bien-être/i }));
//     const bienEtreCards = screen
//       .getAllByTestId('card')
//       .map((el) => el.textContent);
//     expect(bienEtreCards).toEqual(['Massage Bien-être']);

//     // On clique sur "tous"
//     fireEvent.click(screen.getByRole('button', { name: /tous/i }));
//     expect(screen.getAllByTestId('card')).toHaveLength(4);
//   });
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServicesPage from '@/app/Services/page';
import { dataType } from '@/utils/data';

// Mock propre de DataService
jest.mock('@/utils/data', () => ({
  DataService: [
    {
      id: '1',
      title: 'Coaching Sportif',
      categories: ['sport'],
      image: '/sport.jpg',
      imageAlt: 'Coaching Sportif',
      Description: 'Un coaching personnalisé',
      liste: ['Objectif', 'Résultat'],
      price: '50',
    },
    {
      id: '2',
      title: 'Massage Bien-être',
      categories: ['bien-être'],
      image: '/massage.jpg',
      imageAlt: 'Massage Bien-être',
      Description: 'Un moment de détente',
      liste: ['Relaxation', 'Bien-être'],
      price: '60',
    },
    {
      id: '3',
      title: 'Conseil Nutrition',
      categories: ['nutrition'],
      image: '/nutrition.jpg',
      imageAlt: 'Conseil Nutrition',
      Description: 'Des conseils alimentaires adaptés',
      liste: ['Équilibre', 'Santé'],
      price: '40',
    },
    {
      id: '4',
      title: 'Pack Complet',
      categories: ['sport', 'nutrition'],
      image: '/pack.jpg',
      imageAlt: 'Pack Complet',
      Description: 'Sport + Nutrition pour des résultats rapides',
      liste: ['Programme sport', 'Suivi nutritionnel'],
      price: '90',
    },
  ] satisfies dataType[],
}));

// Typage du composant mocké CardService
jest.mock('@/app/src/components/card', () => ({
  CardService: ({ DataService }: { DataService: dataType }) => (
    <div data-testid="card">{DataService.title}</div>
  ),
}));

// Typage simple du bouton
jest.mock('@/src/components/ui/button', () => ({
  Button: ({
    children,
    ...rest
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  }) => <button {...rest}>{children}</button>,
}));

// Tests
describe('ServicesPage Component', () => {
  it('affiche le titre principal', () => {
    render(<ServicesPage />);
    expect(
      screen.getByRole('heading', {
        name: /Nos Services de Coaching & Nutrition/i,
      })
    ).toBeInTheDocument();
  });

  it('affiche tous les boutons de filtre', () => {
    render(<ServicesPage />);
    const filters = ['tous', 'sport', 'bien-être', 'nutrition'];
    filters.forEach((filter) => {
      expect(
        screen.getByRole('button', { name: new RegExp(filter, 'i') })
      ).toBeInTheDocument();
    });
  });

  it('affiche tous les services au chargement', () => {
    render(<ServicesPage />);
    expect(screen.getAllByTestId('card')).toHaveLength(4);
  });

  it('filtre les services par catégorie', () => {
    render(<ServicesPage />);

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
    expect(visibleCards).toEqual(['Massage Bien-être']);

    // Filtre "tous"
    fireEvent.click(screen.getByRole('button', { name: /tous/i }));
    expect(screen.getAllByTestId('card')).toHaveLength(4);
  });
});
