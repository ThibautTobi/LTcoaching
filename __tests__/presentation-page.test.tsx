import React from 'react';
import { render, screen } from '@testing-library/react';
import Presentation from '@/app/Presentation/page';

// // On va mocker CoachProfileCard pour éviter d'avoir à tester son contenu interne
// jest.mock('@/app/src/components/coachCard', () => {
//   return function MockCoachProfileCard(props: any) {
//     return (
//       <div data-testid="coach-card">
//         <h2>{props.name}</h2>
//         <p>{props.description}</p>
//         <ul>
//           {props.formations?.map((f: string, idx: number) => (
//             <li key={idx}>{f}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
// });

type CoachProps = {
  name: string;
  description: string;
  formations: string[];
};

jest.mock('@/app/src/components/coachCard', () => {
  return function MockCoachProfileCard({
    name,
    description,
    formations,
  }: CoachProps) {
    return (
      <div data-testid="coach-card">
        <h2>{name}</h2>
        <p>{description}</p>
        <ul>
          {formations.map((f, idx) => (
            <li key={idx}>{f}</li>
          ))}
        </ul>
      </div>
    );
  };
});

describe('Presentation Component', () => {
  it('affiche le titre principal', () => {
    render(<Presentation />);
    expect(
      screen.getByRole('heading', { name: /Découvrez nos coachs/i })
    ).toBeInTheDocument();
  });

  it('affiche le texte d’introduction', () => {
    render(<Presentation />);
    expect(
      screen.getByText(/Des professionnels passionnés/i)
    ).toBeInTheDocument();
  });

  it('rend le composant CoachProfileCard avec les bonnes props', () => {
    render(<Presentation />);
    expect(screen.getByTestId('coach-card')).toBeInTheDocument();
    expect(screen.getByText(/Laure/i)).toBeInTheDocument();
    expect(screen.getByText(/plus de 7 ans d'expérience/i)).toBeInTheDocument();
  });

  it('affiche les formations du coach', () => {
    render(<Presentation />);
    expect(
      screen.getByText(
        /BPJEPS AF - Haltérophilie\/Musculation et Cours Collectifs/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Coach en nutrition/i)).toBeInTheDocument();
  });
});
