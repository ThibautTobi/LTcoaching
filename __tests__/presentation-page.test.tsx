/* eslint-disable @next/next/no-img-element */

import { render, screen } from '@testing-library/react';
import Presentation from '../app/Presentation/page';
import { ImgHTMLAttributes } from 'react';

// --- 🔹 MOCK next/image ---
jest.mock('next/image', () => {
  const MockedImage = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src?.toString()} alt={alt} {...rest} />;
  };
  MockedImage.displayName = 'Image';
  return { __esModule: true, default: MockedImage };
});

// --- 🔹 MOCK CoachProfileCard ---
type CoachCardProps = {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

jest.mock('../app/src/components/coachCard', () => {
  const MockCoachProfileCard = ({
    name,
    description,
    image,
    imageAlt,
  }: CoachCardProps) => (
    <div data-testid="coach-card">
      <h2>{name}</h2>
      <img src={image} alt={imageAlt} />
      <p>{description}</p>
    </div>
  );
  MockCoachProfileCard.displayName = 'CoachProfileCard';
  return MockCoachProfileCard;
});

// --- 🔹 TESTS ---
describe('Présentation Component', () => {
  beforeEach(() => {
    render(<Presentation />);
  });

  test('doit rendre le titre principal et la description', () => {
    expect(
      screen.getByRole('heading', {
        name: /Découvrez nos coachs sportifs professionnels/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/LTcoaching vous accompagne/i)).toBeInTheDocument();
  });

  test('doit rendre deux CoachProfileCard mockés avec les noms et descriptions', () => {
    const coachCards = screen.getAllByTestId('coach-card');
    expect(coachCards).toHaveLength(2);

    expect(screen.getByRole('heading', { name: 'Laure' })).toBeInTheDocument();
    expect(
      screen.getByText(
        /Coach sportif diplômée avec plus de 7 ans d'expérience, spécialisée dans le bien-être/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Thibaut' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Coach sportif diplômé avec plus de 7 ans d'expérience, spécialisé en préparation physique/i
      )
    ).toBeInTheDocument();
  });

  test('doit rendre les images des coachs avec les attributs alt corrects', () => {
    const laureImg = screen.getByAltText(
      /Laure, coach sportif experte en yoga/i
    );
    const thibautImg = screen.getByAltText(
      /Thibaut, coach sportif spécialisé en préparation physique/i
    );

    expect(laureImg).toBeInTheDocument();
    expect(laureImg).toHaveAttribute('src', '/images.png');

    expect(thibautImg).toBeInTheDocument();
    expect(thibautImg).toHaveAttribute('src', '/images.png');
  });

  test('doit inclure les scripts JSON-LD pour SEO', () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts).toHaveLength(2);

    const laureSchema = JSON.parse(scripts[0].innerHTML);
    expect(laureSchema.name).toBe('Laure');
    expect(laureSchema.jobTitle).toContain('Coach sportif');

    const thibautSchema = JSON.parse(scripts[1].innerHTML);
    expect(thibautSchema.name).toBe('Thibaut');
    expect(thibautSchema.jobTitle).toContain('Coach sportif');
  });
});
