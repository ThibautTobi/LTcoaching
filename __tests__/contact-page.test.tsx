/***** a comparer et etudier */
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import ContactPage from './ContactPage';
// import emailjs from '@emailjs/browser';

// // 1. On Mock EmailJS pour éviter d'envoyer de vrais emails pendant les tests
// jest.mock('@emailjs/browser', () => ({
//   send: jest.fn(() => Promise.resolve({ text: 'OK', status: 200 })),
// }));

// // 2. On Mock Google reCAPTCHA qui ne peut pas tourner sans un vrai navigateur
// jest.mock('react-google-recaptcha', () => {
//   const React = require('react');
//   // On crée un faux composant qui expose une méthode getValue via forwardRef
//   return React.forwardRef(({ onChange }, ref) => {
//     React.useImperativeHandle(ref, () => ({
//       getValue: () => 'fake-recaptcha-token', // Simule un captcha validé
//       reset: jest.fn(),
//     }));
//     return <div data-testid="mock-recaptcha" />;
//   });
// });

// describe('ContactPage - Tests Logiques (Jest & RTL)', () => {

//   test('devrait afficher les erreurs de validation Zod en cas de soumission vide', async () => {
//     render(<ContactPage />);

//     const submitButton = screen.getByRole('button', { name: /envoyer/i });
//     await userEvent.click(submitButton);

//     // Vérifie que Zod intercepte les champs vides obligatoires
//     await waitFor(() => {
//       expect(screen.getByText('Le nom est requis')).toBeInTheDocument();
//       expect(screen.getByText('Le prénom est requis')).toBeInTheDocument();
//       expect(screen.getByText('Le numéro de téléphone est requis')).toBeInTheDocument();
//     });
//   });

//   test('devrait valider le téléphone si l’utilisateur met des points ou des espaces', async () => {
//     render(<ContactPage />);

//     const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');

//     // On tape un format que Zod doit nettoyer grâce à .transform()
//     await userEvent.type(phoneInput, '06.12 34.56 78');

//     const submitButton = screen.getByRole('button', { name: /envoyer/i });
//     await userEvent.click(submitButton);

//     // L'erreur "Le numéro doit contenir exactement 10 chiffres" ne doit pas apparaître
//     expect(screen.queryByText('Le numéro doit contenir exactement 10 chiffres')).not.toBeInTheDocument();
//   });

//   test('devrait rejeter un email mal formaté et un message trop court', async () => {
//     render(<ContactPage />);

//     const emailInput = screen.getByPlaceholderText('Votre email');
//     const messageInput = screen.getByPlaceholderText('Votre message');

//     await userEvent.type(emailInput, 'mauvais-format-email');
//     await userEvent.type(messageInput, 'Short'); // Moins de 10 caractères

//     const submitButton = screen.getByRole('button', { name: /envoyer/i });
//     await userEvent.click(submitButton);

//     await waitFor(() => {
//       expect(screen.getByText('Email invalide')).toBeInTheDocument();
//       expect(screen.getByText('Message trop court')).toBeInTheDocument();
//     });
//   });

//   test('devrait changer le texte du bouton lors de la phase d’envoi asynchrone', async () => {
//     render(<ContactPage />);

//     // Remplissage valide de tous les champs pour déclencher le onSubmit
//     await userEvent.type(screen.getByPlaceholderText('Votre nom'), 'Dupont');
//     await userEvent.type(screen.getByPlaceholderText('Votre Prénom'), 'Jean');
//     await userEvent.type(screen.getByPlaceholderText('Votre numéro de téléphone'), '0612345678');
//     await userEvent.type(screen.getByPlaceholderText('Votre email'), 'jean@gmail.com');
//     await userEvent.type(screen.getByPlaceholderText('Votre message'), 'Bonjour, je souhaite réserver un créneau.');

//     const submitButton = screen.getByRole('button', { name: 'Envoyer' });
//     await userEvent.click(submitButton);

//     // Vérifie le passage instantané à l'état visuel "Envoi..."
//     expect(screen.getByRole('button', { name: /envoi.../i })).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContactPage from '@/app/contact/page';

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
