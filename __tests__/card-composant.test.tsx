import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardService } from '@/app/src/components/card';
import '@testing-library/jest-dom';
import { dataType } from '@/utils/data';

// --- Mocks des dépendances externes ---

// Mock du composant next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  const MockedLink = ({
    children,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a {...rest}>{children}</a>;
  return MockedLink;
});

// Mock du composant next/image
jest.mock('next/image', () => {
  // eslint-disable-next-line react/display-name
  const MockedImage = ({
    alt,
    ...rest
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt || ''} {...rest} />;
  };
  return MockedImage;
});

// Mock des composants Shadcn/UI pour un rendu simplifié
jest.mock('@/src/components/ui/card', () => ({
  Card: ({ children, ...rest }: { children: React.ReactNode }) => (
    <div {...rest}>{children}</div>
  ),

  CardContent: ({ children, ...rest }: { children: React.ReactNode }) => (
    <div {...rest}>{children}</div>
  ),

  CardTitle: ({ children, ...rest }: { children: React.ReactNode }) => (
    <h3 {...rest}>{children}</h3>
  ),
}));

jest.mock('@/src/components/ui/button', () => ({
  Button: ({ children, ...rest }: { children: React.ReactNode }) => (
    <button {...rest}>{children}</button>
  ),
}));

// Faux objet de données pour les tests
const mockService: dataType = {
  id: 'service1',
  title: 'Coaching Sportif',
  Description: 'Un accompagnement sportif personnalisé.',
  image: '/img/sport.jpg',
  imageAlt: 'Image sport',
  liste: [''],
  categories: ['sport'],
  price: '50€',
};

describe('CardService Component', () => {
  it('doit rendre le titre et la description du service lorsque showDescription est true', () => {
    render(<CardService DataService={mockService} showDescription={true} />);

    // Vérifie que le titre est bien affiché
    expect(
      screen.getByRole('heading', { name: mockService.title })
    ).toBeInTheDocument();

    // Vérifie que la description est affichée
    expect(screen.getByText(mockService.Description)).toBeInTheDocument();
  });

  it('affiche le bouton "Voir Le Prix" si showLink est true', () => {
    render(<CardService DataService={mockService} showLink={true} />);
    const button = screen.getByRole('button', { name: /voir le prix/i });
    expect(button).toBeInTheDocument();
  });

  it('n’affiche pas le bouton "Voir Le Prix" si showLink est false', () => {
    render(<CardService DataService={mockService} showLink={false} />);
    const button = screen.queryByRole('button', { name: /voir le prix/i });
    expect(button).not.toBeInTheDocument();
  });

  it('affiche l’image si showImage est true', () => {
    render(<CardService DataService={mockService} showImage={true} />);
    const image = screen.getByAltText(mockService.imageAlt);
    expect(image).toBeInTheDocument();
  });

  it('n’affiche pas l’image si showImage est false', () => {
    render(<CardService DataService={mockService} showImage={false} />);
    const image = screen.queryByAltText(mockService.imageAlt);
    expect(image).not.toBeInTheDocument();
  });
});
