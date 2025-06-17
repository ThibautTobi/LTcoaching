import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import '@testing-library/jest-dom';

describe('Home Page', () => {
  it('affiche le titre et le composant Header', () => {
    render(<Home />);

    // Vérifie la présence du titre
    expect(screen.getByText('test')).toBeInTheDocument();

  });
});
