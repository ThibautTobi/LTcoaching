import { render } from '@testing-library/react';
import Home from '@/app/page';
import React from 'react';
import '@testing-library/jest-dom';

// Groupe de tests dédié aux snapshots du composant Home
describe('Home component snapshot tests', () => {
  it('correspond au snapshot', () => {
    // On rend le composant Home et on récupère le fragment HTML complet
    const { asFragment } = render(<Home />);

    // On compare ce rendu au snapshot enregistré
    expect(asFragment()).toMatchSnapshot();
  });
});
