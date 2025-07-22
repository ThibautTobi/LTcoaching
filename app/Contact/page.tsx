'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';

import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/src/components/ui/alert';

/**
 * Schéma de validation du formulaire de contact.
 * Utilise `zod` pour valider les champs saisis par l'utilisateur.
 *
 * Champs :
 * - nom : requis, minimum 2 caractères
 * - prénom : requis, minimum 2 caractères
 * - genre : optionnel, valeur 'Homme', 'Femme' ou vide
 * - téléphone : optionnel, exactement 10 chiffres
 * - email : requis, format email valide
 * - message : requis, minimum 10 caractères
 */

const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  prenom: z.string().min(2, 'Le prénom est requis'),
  genre: z.enum(['Homme', 'Femme']).optional().or(z.literal('')),
  telephone: z
    .string()
    .regex(/^\d{10}$/, 'Le numéro de téléphone doit contenir 10 chiffres')
    .optional(),

  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Composant de page de contact.
 *
 * Affiche un formulaire de contact avec :
 * - champs nom, prénom, genre, téléphone, email, message
 * - validation via `react-hook-form` et `zod`
 * - protection anti-spam avec Google reCAPTCHA
 * - envoi de l'email via `EmailJS`
 *
 * Affiche également une alerte de succès ou d'erreur selon la réponse.
 */

export default function ContactPage() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: '',
      prenom: '',
      genre: '',
      telephone: '',
      email: '',
      message: '',
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  /**
   * Gère la soumission du formulaire de contact.
   *
   * Étapes :
   * 1. Récupère le token reCAPTCHA
   * 2. Vérifie sa présence
   * 3. Envoie les données du formulaire à EmailJS
   * 4. Affiche une alerte de succès ou d'erreur
   *
   * @param {ContactFormData} data - Données validées du formulaire
   */

  const onSubmit = async (data: ContactFormData) => {
    console.log('from :', data);

    const recaptchaToken = recaptchaRef.current?.getValue();

    if (!recaptchaToken) {
      setError('Veuillez valider le reCAPTCHA.');
      return;
    }
    setError('');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          nom: data.nom,
          prenom: data.prenom,
          genre: data.genre || 'non specifié',
          telephone: data.telephone || 'non specifié',
          reply_to: data.email,
          message: data.message,
          'g-recaptcha-response': recaptchaToken,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setError('');
      form.reset();
      recaptchaRef.current?.reset();
    } catch (err) {
      setError('Une erreur est survenue, veuillez réessayer.');
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-center text-[#C6A35E] m-6">
        Contactez-nous
      </h1>

      {/* informations Champs Obligatoires */}
      <p className="text-primary text-center font-light mb-8">
        * Champs Obligatoires
      </p>

      {/* informations modale si erreur ou reussite de l'envoi */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Alert className="bg-card text-primary border-4 border-primary rounded-xl max-w-md w-full mx-4 shadow-xl">
            <AlertTitle className="text-center p-2 text-xl font-semibold">
              Message envoyé
            </AlertTitle>
            <AlertDescription className="text-center px-4 pb-4">
              Merci ! Votre message a été envoyé avec succès.
            </AlertDescription>

            {/* Bouton Fermer */}
            <div className="flex justify-center pb-2">
              <Button
                variant="outline"
                className="bg-destructive text-white  hover:bg-destructive/80 rounded-xl"
                onClick={() => setSubmitted(false)}
              >
                Fermer
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Alert
            variant="destructive"
            className="bg-card text-destructive border-4 border-destructive rounded-xl max-w-md w-full mx-4 shadow-xl"
          >
            <AlertTitle className="text-center p-2 text-xl font-semibold">
              Erreur :
            </AlertTitle>
            <AlertDescription className="text-center px-4 pb-4">
              {error}
            </AlertDescription>

            {/* Bouton Fermer */}

            <div className="flex justify-center pb-2">
              <Button
                variant="outline"
                className="bg-destructive text-white  hover:bg-destructive/80 rounded-xl"
                onClick={() => setError(null)}
              >
                Fermer
              </Button>
            </div>
          </Alert>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full max-w-md p-6 bg-card border border-border rounded-2xl shadow-[0_0_30px_rgba(198,163,94,0.3)]"
        >
          {/* Champ Nom */}
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">Nom *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre nom"
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Prenom */}
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">
                  {' '}
                  Prénom *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre Prénom"
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ selction du Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">Genre</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-input text-black rounded-xl px-4 py-2 border border-primary focus:ring-2 focus:ring-primary/60 justify-between">
                      <SelectValue placeholder="Choisissez votre genre" />
                    </SelectTrigger>
                    <SelectContent className="min-w-[var(--radix-select-trigger-width)] bg-input border border-primary text-black shadow-lg rounded-xl w-full">
                      <SelectItem
                        value="Homme"
                        className="hover:bg-primary/50 rounded-xl text-center p-2"
                      >
                        Homme
                      </SelectItem>
                      <SelectItem
                        value="Femme"
                        className="hover:bg-primary/50 rounded-xl text-center p-2"
                      >
                        Femme
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Telephone */}
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">
                  Téléphone
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre email"
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">
                  Message *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Votre message"
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full resize-none"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* reCAPTCHA */}
          <div className="flex justify-center recaptcha-container p-2">
            <ReCAPTCHA
              className="mx-auto"
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            />
          </div>

          {/* Bouton envoyer */}
          <Button
            variant="outline"
            type="submit"
            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg px-6 py-2 mx-auto block transition"
          >
            Envoyer
          </Button>
        </form>
      </Form>
    </section>
  );
}
