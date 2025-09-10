import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../app/src/components/footer';
import React from 'react';

// --- MOCKS ---
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
  MockedImage.displayName = 'Image';
  return { __esModule: true, default: MockedImage };
});

// Mock du composant next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  const MockedLink = ({
    children,
    href,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
  }) => {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
  MockedLink.displayName = 'Link';
  return { __esModule: true, default: MockedLink };
});

// Mock des icônes de lucide-react
jest.mock('lucide-react', () => ({
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="icon-facebook" {...props} />
  ),
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="icon-instagram" {...props} />
  ),
}));

// --- TESTS ---
describe('Footer', () => {
  it('doit rendre le footer avec tous les éléments essentiels', () => {
    render(<Footer />);

    // --- Titre principal ---
    expect(
      screen.getByRole('heading', { name: /Sport Bien-être Nutrition/i })
    ).toBeInTheDocument();

    // --- Liens de navigation ---
    expect(
      screen.getByRole('link', { name: /Présentation/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Tarifs/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /^Contact$/i })
    ).toBeInTheDocument();

    // --- Liens de contact ---
    expect(
      screen.getByRole('link', { name: /ltcoaching.contact@gmail.com/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument();

    // --- Icônes sociales ---
    expect(screen.getByTestId('icon-facebook')).toBeInTheDocument();
    expect(screen.getByTestId('icon-instagram')).toBeInTheDocument();

    // --- Copyright ---
    const currentYear = new Date().getFullYear();
    const copyright = `© ${currentYear} LT Coaching. Tous droits réservés.`;
    expect(screen.getByText(copyright)).toBeInTheDocument();

    // --- Logo ---
    expect(
      screen.getByRole('img', { name: 'Logo LTcoaching' })
    ).toBeInTheDocument();
  });

  it('doit contenir un élément <footer> comme conteneur principal', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('doit rendre tous les liens avec un attribut href', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('href')).not.toBe('');
    });
  });

  it('doit afficher correctement l’année dynamique dans le copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
  });
});
