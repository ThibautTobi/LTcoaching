import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '@/app/src/components/navBar';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

// --- Mock de next/link ---
jest.mock('next/link', () => ({
  __esModule: true,
  default: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }
  ) => {
    return <a {...props}>{props.children}</a>;
  },
}));

// --- Mock de usePathname pour contrôler le chemin d'accès ---
const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// --- Mock du composant Button de shadcn/ui ---
jest.mock('@/src/components/ui/button', () => ({
  __esModule: true,
  Button: ({
    onClick,
    children,
    ...props
  }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

// --- Mock des icônes lucide-react ---
jest.mock('lucide-react', () => ({
  Menu: () => (
    <span role="img" aria-label="Menu icon">
      Menu
    </span>
  ),
  X: () => (
    <span role="img" aria-label="Close icon">
      X
    </span>
  ),
}));

describe('NavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Tests pour le menu Desktop ---
  it('doit rendre les liens de navigation pour le menu desktop', () => {
    mockUsePathname.mockReturnValue('/Services');
    render(<NavBar />);

    expect(screen.getByRole('link', { name: /Accueil/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Présentation/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Tarifs/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();

    const activeLink = screen.getByRole('link', { name: 'Services' });
    expect(activeLink).toHaveClass('after:w-full');

    expect(
      screen.getByRole('button', { name: /Ouvrir le menu/i })
    ).toBeInTheDocument();
  });

  // --- Tests pour le menu Mobile ---
  it('doit ouvrir et fermer le menu mobile au clic du bouton', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavBar />);

    const openMenuButton = screen.getByRole('button', {
      name: /Ouvrir le menu/i,
    });
    expect(
      within(openMenuButton).getByRole('img', { name: 'Menu icon' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Fermer le menu/i })
    ).not.toBeInTheDocument();

    fireEvent.click(openMenuButton);
    expect(
      within(openMenuButton).getByRole('img', { name: 'Close icon' })
    ).toBeInTheDocument();
    const closeMenuButton = screen.getByRole('button', {
      name: /Fermer le menu/i,
    });
    expect(closeMenuButton).toBeInTheDocument();

    fireEvent.click(closeMenuButton);
    expect(
      within(openMenuButton).getByRole('img', { name: 'Menu icon' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Fermer le menu/i })
    ).not.toBeInTheDocument();
  });
});
