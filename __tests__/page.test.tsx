import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Test du rendu de base
describe('Home Page', () => {
  it('affiche le titre et le composant Header', () => {
    render(<Home />);

    // Vérifie que le titre est affiché
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('test');

    // Vérifie que le paragraphe est affiché
    expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
  });
});
