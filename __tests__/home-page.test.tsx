// On importe la fonction 'render' pour afficher le composant dans un environnement de test,
// et 'screen' pour interagir avec les éléments visibles.
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Groupe de tests du composant Home
describe('Home component', () => {
  //Avant chaque test (chaque "it"), on affiche le composant Home dans un environnement de test.
  // Cela évite de répéter `render(<Home />)` à chaque fois.
  beforeEach(() => {
    render(<Home />);
  });

  //TEST 1 : Vérifie que le titre principal est bien affiché

  it('affiche le titre principal de la page', () => {
    // getByRole cherche un élément par son "rôle" ARIA. Ici, on cherche un "heading" (= titre).
    const title = screen.getByRole('heading', {
      name: /atteins tes objectifs avec ltcoaching/i,
    });
    // On s'attend à ce que ce titre soit bien présent dans le DOM.
    expect(title).toBeInTheDocument();
  });

  // TEST 2 : Vérifie que le paragraphe de description est affiché

  it('affiche le sous-titre de description', () => {
    // getByText cherche un texte exact ou partiel dans le DOM
    const subtitle = screen.getByText(
      /coaching personnalisé, suivi nutritionnel, préparation mentale/i
    );

    expect(subtitle).toBeInTheDocument();
  });

  //TEST 3 : Vérifie que la section "Qui sommes-nous ?" est présente

  it('affiche le texte "Qui sommes-nous"', () => {
    const sectionTitle = screen.getByRole('heading', {
      name: /qui sommes-nous/i,
    });
    expect(sectionTitle).toBeInTheDocument();
  });

  //TEST 4 : Vérifie que le dernier appel à l’action est bien là

  it('affiche le bouton "Nous contacter"', () => {
    const finalCta = screen.getByRole('button', { name: /nous contacter/i });
    expect(finalCta).toBeInTheDocument();
  });

  // TEST 5 option ( snapshot intégrer plus simple pour petit composant pas complexe ): Vérifie que le rendu du composant n’a pas changé (snapshot)
  // it('correspond au snapshot', () => {
  //   // On utilise react-test-renderer pour générer le snapshot
  //   const tree = renderer.create(<Home />).toJSON();

  //   // Ce snapshot sera stocké automatiquement dans __snapshots__/
  //   expect(tree).toMatchSnapshot();
  // });
});
