import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import CoachProfileCard from '@/app/src/components/coachCard';

// Définition des props autorisées pour le mock d'image
type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
};

// Mock du composant Image de Next.js
jest.mock('next/image', () => {
  // eslint-disable-next-line react/display-name
  const MockedImage = ({ alt, ...rest }: MockImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt || ''} {...rest} />;
  };
  return { __esModule: true, default: MockedImage };
});

// Mock des composants Lucide-react
jest.mock('lucide-react', () => ({
  LucideBookOpen: () => <svg data-testid="book-icon" />,
  Trophy: () => <svg data-testid="trophy-icon" />,
}));

const mockProps = {
  name: 'Jean Dupont',
  image: '/images/jean_dupont.jpg',
  imageAlt: 'Portrait de Jean Dupont, coach',
  description:
    'Coach certifié en développement personnel et professionnel. Spécialiste de la gestion du stress et de la performance en entreprise.',
  formations: ['Coach professionnel certifié', 'PNL Praticien'],
  specialites: ['Gestion du stress', 'Performance', 'Leadership'],
};

describe('CoachProfileCard', () => {
  it("doit rendre le nom, l'image, la description, les formations et les spécialités", () => {
    render(<CoachProfileCard {...mockProps} />);

    // Vérifie le titre (nom du coach)
    expect(
      screen.getByRole('heading', { level: 2, name: mockProps.name })
    ).toBeInTheDocument();

    // Vérifie l'image avec alt
    expect(
      screen.getByRole('img', { name: 'Photo de Jean Dupont, coach sportif' })
    ).toHaveAttribute('src', mockProps.image);

    // Vérifie la description
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    // Vérifie la section Formations
    expect(
      screen.getByRole('heading', { level: 3, name: /Formations/i })
    ).toBeInTheDocument();
    mockProps.formations.forEach((formation) => {
      expect(screen.getByText(formation)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId('book-icon')).toHaveLength(
      mockProps.formations.length
    );

    // Vérifie la section Spécialités
    expect(
      screen.getByRole('heading', { level: 3, name: /Spécialités/i })
    ).toBeInTheDocument();
    mockProps.specialites.forEach((specialite) => {
      expect(screen.getByText(specialite)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId('trophy-icon')).toHaveLength(
      mockProps.specialites.length
    );

    // Vérifie le bouton Contact
    expect(
      screen.getByRole('link', { name: /Contactez-moi/i })
    ).toBeInTheDocument();
  });

  it('ne doit pas rendre les sections "Formations" ou "Spécialités" si les tableaux sont vides', () => {
    render(
      <CoachProfileCard {...mockProps} formations={[]} specialites={[]} />
    );

    expect(
      screen.queryByRole('heading', { level: 3, name: /Formations/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 3, name: /Spécialités/i })
    ).not.toBeInTheDocument();
  });

  it('ne doit pas rendre le bouton de contact lorsque showContact est faux', () => {
    render(<CoachProfileCard {...mockProps} showContact={false} />);

    expect(
      screen.queryByRole('link', { name: /Contactez-moi/i })
    ).not.toBeInTheDocument();
  });
});
