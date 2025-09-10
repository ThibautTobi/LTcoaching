// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';

// import ContactPage from '@/app/Contact/page';

// // --- Mock ReCAPTCHA simplifié ---
//  jest.mock('react-google-recaptcha', () => {
//   // eslint-disable-next-line react/display-name
//   const MockReCAPTCHA = React.forwardRef((props, ref) => {
//     // On utilise useImperativeHandle pour exposer les méthodes attendues sur la ref
//     React.useImperativeHandle(ref, () => ({
//       getValue: jest.fn(() => 'mock-recaptcha-token'),
//       reset: jest.fn(),
//       execute: jest.fn(),
//     }));
//     return <div data-testid="recaptcha" />;
//   });
//   return {
//     __esModule: true,
//     default: MockReCAPTCHA,
//   };
// });

// // --- Mocks composants Shadcn simplifiés ---
// jest.mock('@/src/components/ui/form', () => {
//   const React = require('react');
//   return {
//     Form: ({ children }: { children: React.ReactNode }) => <form>{children}</form>,
//     FormField: ({ render, name }: { render: any; name: string }) =>
//       render({ field: { name, id: `field-${name}`, value: '', onChange: jest.fn() } }),
//     FormItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
//     FormLabel: ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
//       <label htmlFor={htmlFor}>{children}</label>
//     ),
//     FormControl: ({ children, id }: { children: React.ReactNode; id?: string }) => {
//       const child = React.Children.only(children) as React.ReactElement;
//       return React.cloneElement(child, { id });
//     },
//     FormMessage: () => <div />,
//   };
// });

// jest.mock('@/src/components/ui/input', () => ({
//   Input: (props: any) => <input {...props} />,
// }));

// jest.mock('@/src/components/ui/textarea', () => ({
//   Textarea: (props: any) => <textarea {...props} />,
// }));

// jest.mock('@/src/components/ui/button', () => ({
//   Button: ({ children, ...props }: { children: React.ReactNode }) => (
//     <button {...props}>{children}</button>
//   ),
// }));

// // --- Tests ---
// describe('ContactPage - Tests via placeholders', () => {
//   test('se rend sans erreur', () => {
//     render(<ContactPage />);
//     expect(screen.getByRole('heading', { name: /contactez-nous/i })).toBeInTheDocument();
//   });

//   test('contient tous les champs du formulaire via placeholder', () => {
//     render(<ContactPage />);

//     // On teste via les placeholders
//     expect(screen.getByPlaceholderText(/Votre nom/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Votre Prénom/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Votre numéro de téléphone/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Votre email/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Votre message/i)).toBeInTheDocument();

//     // Vérifie le bouton et reCAPTCHA
//     expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
//     expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContactPage from '@/app/Contact/page';

// --- Mocks nécessaires pour le rendu de la page ---

// Mock du composant ReCAPTCHA
jest.mock('react-google-recaptcha', () => {
  // eslint-disable-next-line react/display-name
  const MockReCAPTCHA = React.forwardRef((props, ref) => {
    // On utilise useImperativeHandle pour exposer les méthodes attendues sur la ref
    React.useImperativeHandle(ref, () => ({
      getValue: jest.fn(() => 'mock-recaptcha-token'),
      reset: jest.fn(),
      execute: jest.fn(),
    }));
    return <div data-testid="recaptcha" />;
  });
  return {
    __esModule: true,
    default: MockReCAPTCHA,
  };
});

// Mock des composants de formulaire de Shadcn/ui
jest.mock('@/src/components/ui/form', () => {
  type RenderProps = { field: { name: string; id: string } };
  return {
    Form: ({ children }: { children: React.ReactNode }) => (
      <div role="form">{children}</div>
    ),
    FormField: ({
      name,
      render,
    }: {
      name: string;
      render: (props: RenderProps) => React.ReactNode;
    }) => {
      const id = `field-${name}`;
      return render({ field: { name, id } });
    },
    FormItem: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    FormLabel: ({
      children,
      htmlFor,
    }: {
      children: React.ReactNode;
      htmlFor?: string;
    }) => <label htmlFor={htmlFor}>{children}</label>,
    FormControl: ({
      children,
      id,
    }: {
      children: React.ReactNode;
      id?: string;
    }) => {
      const child = React.Children.only(children) as React.ReactElement;
      return React.cloneElement(child, { id });
    },
    FormMessage: () => <div />,
  };
});

// Mocks des composants Input, Textarea et Button
jest.mock('@/src/components/ui/input', () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}));

jest.mock('@/src/components/ui/textarea', () => ({
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} />
  ),
}));

jest.mock('@/src/components/ui/button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

jest.mock('@/src/components/ui/alert', () => ({
  Alert: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AlertTitle: ({ children }: { children: React.ReactNode }) => (
    <h3>{children}</h3>
  ),
  AlertDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

// --- Fin des Mocks ---

describe('ContactPage - Tests de Rendu', () => {
  test('devrait se rendre sans erreurs', () => {
    render(<ContactPage />);
    const heading = screen.getByRole('heading', { name: /contactez-nous/i });
    expect(heading).toBeInTheDocument();
  });

  test('devrait contenir le formulaire et les champs de saisie', () => {
    render(<ContactPage />);

    // On teste via les placeholders pour contourner le problème de labels
    expect(screen.getByPlaceholderText(/Votre nom/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Votre Prénom/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Votre numéro de téléphone/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Votre email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Votre message/i)).toBeInTheDocument();

    // Vérifie que le bouton d'envoi est présent
    expect(
      screen.getByRole('button', { name: /envoyer/i })
    ).toBeInTheDocument();

    // Vérifie la présence du ReCAPTCHA mocké
    expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
  });
});
