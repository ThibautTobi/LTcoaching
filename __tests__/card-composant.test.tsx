import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardService } from '@/app/src/components/card';
import '@testing-library/jest-dom';
import { DataType } from '@/utils/data';

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
// jest.mock('next/image', () => {
//   // eslint-disable-next-line react/display-name
//   const MockedImage = ({
//     alt,
//     ...rest
//   }: React.ImgHTMLAttributes<HTMLImageElement>) => {
//     // eslint-disable-next-line @next/next/no-img-element
//     return <img alt={alt || ''} {...rest} />;
//   };
//   return MockedImage;
// });

// Mock du composant next/image avec gestion de fill et priority
// jest.mock('next/image', () => {
//   // eslint-disable-next-line react/display-name
//   const MockedNextImage = ({
//     src,
//     alt,
//     fill,
//     width,
//     height,
//     priority,
//     ...rest
//   }: any) => {
//     // Simule le style de l’image selon la prop "fill"
//     const style = fill
//       ? { position: 'absolute', inset: 0, objectFit: 'cover' }
//       : { width, height };

//     // eslint-disable-next-line @next/next/no-img-element
//     return (
//       <img
//         src={typeof src === 'string' ? src : (src?.src || '')}
//         alt={alt || ''}
//         data-priority={priority ? 'true' : 'false'}
//         style={style}
//         {...rest}
//       />
//     );
//   };
//   return MockedNextImage;
// });

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
const mockService: DataType = {
  id: 'service1',
  title: 'Coaching Sportif',
  description: 'Un accompagnement sportif personnalisé.',
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
    expect(screen.getByText(mockService.description)).toBeInTheDocument();
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
