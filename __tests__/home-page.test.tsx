import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';

// --- 🔹 MOCKS ---

// Mock de `next/image`
jest.mock('next/image', () => {
  const MockedImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  };
  MockedImage.displayName = 'MockedImage';
  return { __esModule: true, default: MockedImage };
});

// Mock de `next/link`
jest.mock('next/link', () => {
  const MockedLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };
  MockedLink.displayName = 'MockedLink';
  return { __esModule: true, default: MockedLink };
});

// --- 🔹 TESTS ---
describe('Home Page', () => {
  it("doit rendre la page d'accueil avec les titres, paragraphes, image et CTA", () => {
    render(<Home />);

    // --- Titres principaux ---
    expect(
      screen.getByRole('heading', { name: /Atteins tes objectifs/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Qui sommes-nous \?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Prêt à transformer ton corps et ta vie \?/i,
      })
    ).toBeInTheDocument();

    // --- Paragraphes descriptifs ---
    expect(
      screen.getByText(
        /Coaching personnalisé, suivi nutritionnel, préparation mentale./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Deux Coachs sportifs diplômés avec plus de 7 ans d'expérience./i
      )
    ).toBeInTheDocument();

    // --- Image principale ---
    expect(
      screen.getByRole('img', { name: /image-sport/i })
    ).toBeInTheDocument();

    // --- CTA (appel à l'action) ---
    const contactButton = screen.getByRole('link', { name: /Nous contacter/i });
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveAttribute('href', '/Contact');
  });

  it('doit contenir une structure sémantique correcte (main et sections)', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelectorAll('section').length).toBeGreaterThanOrEqual(
      1
    );
  });

  it('les titres doivent être hiérarchisés correctement (H1 puis H2/H3)', () => {
    render(<Home />);
    const headings = screen.getAllByRole('heading');
    // Vérifie qu'il y a un H1 principal
    expect(headings.some((h) => h.tagName === 'H1')).toBe(true);
    // Vérifie qu'il y a au moins un H2
    expect(headings.some((h) => h.tagName === 'H2')).toBe(true);
  });

  it('doit correspondre au snapshot (pour prévenir les régressions UI)', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
