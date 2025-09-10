import { render } from '@testing-library/react';
import Home from '../../app/page';
import React from 'react';
import '@testing-library/jest-dom';

// --- Mocks des dépendances externes ---

// Mock de next/image
jest.mock('next/image', () => {
  // eslint-disable-next-line react/display-name
  const MockedImage = ({
    alt,
    ...rest
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt || ''} {...rest} />;
  };
  return { __esModule: true, default: MockedImage };
});

// Mock de next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  const MockedLink = ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );

  return { __esModule: true, default: MockedLink };
});

// --- Groupe de tests ---
describe('Home page snapshot tests', () => {
  it('devrait correspondre à un snapshot stable', () => {
    const { asFragment } = render(<Home />);

    // Vérifie que le rendu de la page correspond au snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
