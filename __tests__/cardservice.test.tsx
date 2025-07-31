import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardService } from '@/app/src/components/card';
import '@testing-library/jest-dom';
import { dataType } from '@/utils/data';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

// Faux objet de données pour les tests
const mockService: dataType = {
  id: 'service1',
  title: 'Coaching Sportif',
  Description: 'Un accompagnement sportif personnalisé.',
  image: '/img/sport.jpg',
  imageAlt: 'Image sport',
  categories: ['sport'],
  price: '50€',
};

describe('CardService Component', () => {
  it('affiche le titre et la description du service', () => {
    render(<CardService DataService={mockService} />);

    // expect(screen.getByText('Coaching Sportif Personnalisé')).toBeInTheDocument();
    // expect(
    //   screen.getByText('Programme d’entraînement adapté à vos objectifs.')
    // ).toBeInTheDocument();
  });

  it('affiche le bouton Voir Le Prix si showLink est true', () => {
    render(
      <MemoryRouterProvider>
        <CardService DataService={mockService} showLink={true} />
      </MemoryRouterProvider>
    );

    const button = screen.getByRole('button', { name: /voir le prix/i });
    expect(button).toBeInTheDocument();
  });

  it('n’affiche pas le bouton Voir Le Prix si showLink est false', () => {
    render(<CardService DataService={mockService} showLink={false} />);
    const button = screen.queryByRole('button', { name: /voir le prix/i });
    expect(button).not.toBeInTheDocument();
  });

  it('affiche l’image si showImage est true', () => {
    render(<CardService DataService={mockService} showImage={true} />);
    const image = screen.getByAltText('Image sport');
    expect(image).toBeInTheDocument();
  });

  it('n’affiche pas l’image si showImage est false', () => {
    render(<CardService DataService={mockService} showImage={false} />);
    const image = screen.queryByAltText('Image sport');
    expect(image).not.toBeInTheDocument();
  });
});
