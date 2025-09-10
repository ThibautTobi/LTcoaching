import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/app/src/components/header';

// Mock du composant Image de Next.js pour éviter les erreurs
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

// Mock du composant NavBar pour isoler le test du Header
jest.mock('@/app/src/components/navBar', () => ({
  __esModule: true,
  default: () => <nav data-testid="navbar-mock" />,
}));

describe('Header', () => {
  it('doit rendre le logo, le sous-titre et le composant de navigation', () => {
    // Rendre le composant Header
    render(<Header />);

    // 1. Vérifier que le lien du logo est présent et correct (corrigé pour l'accessibilité)
    const logoLink = screen.getByRole('link', { name: /acceuil/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const logoImage = screen.getByRole('img', { name: /Logo LTcoaching/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/LTcoaching-sansBG.png');

    // 2. Vérifier que le sous-titre est présent
    expect(screen.getByText('Sport Bien-être Nutrition')).toBeInTheDocument();

    // 3. Vérifier que le composant NavBar est rendu (via le mock)
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
  });
});
