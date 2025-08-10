import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Test du rendu de base
describe('Home Page', () => {
  it('affiche le titre et le composant Header', () => {
    render(<Home />);

    // Vérifie que le titre est affiché
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Atteins tes objectifs avec LTcoaching'
    );

    // Vérifie que le paragraphe est affiché
    expect(
      screen.getByText(
        /Coaching personnalisé, suivi nutritionnel, préparation mentale.\s*Des coachs diplômés à tes côtés, pour atteindre tes objectifs./
      )
    ).toBeInTheDocument();
  });
});
