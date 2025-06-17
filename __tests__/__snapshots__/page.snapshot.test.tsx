import { render } from '@testing-library/react';
import Home from '../../app/page';
import React from 'react';

describe('Home Snapshot', () => {
  it('correspond au snapshot sauvegardé', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
