'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';

// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from '@/src/components/ui/select';

import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/src/components/ui/alert';

/**
 * Schéma de validation du formulaire de contact avec Zod.
 *
 * @typedef {Object} ContactFormData
 * @property {string} nom - Nom de l'utilisateur (min. 2 caractères)
 * @property {string} prenom - Prénom de l'utilisateur (min. 2 caractères)
 * @property {'Homme' | 'Femme' | ''} [genre] - Genre sélectionné
 * @property {string} [telephone] - Numéro de téléphone (10 chiffres)
 * @property {string} email - Adresse email valide
 * @property {string} message - Contenu du message (min. 10 caractères)
 */

const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  prenom: z.string().min(2, 'Le prénom est requis'),
  genre: z.enum(['Homme', 'Femme']).or(z.literal('')).optional(),
  telephone: z
    .string()
    .min(1, 'Le numéro de téléphone est requis')
    .transform((val) => val.replace(/\D/g, ''))
    .refine(
      (val) => val.length === 10,
      'Le numéro doit contenir exactement 10 chiffres'
    ),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Composant React de page de contact.
 *
 * @returns {JSX.Element} Formulaire de contact avec validation, reCAPTCHA et envoi via EmailJS.
 */

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);

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
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  /**
   * Fonction asynchrone de gestion de la soumission du formulaire.
   *
   * Étapes :
   * 1. Récupère le token reCAPTCHA
   * 2. Valide sa présence
   * 3. Envoie les données à EmailJS avec reCAPTCHA
   * 4. Gère les états de succès ou d'erreur
   *
   * @param {ContactFormData} data - Données validées du formulaire
   * @returns {Promise<void>}
   */

  const onSubmit = async (data: ContactFormData) => {
    console.log('from :', data);

    const recaptchaToken = recaptchaRef.current?.getValue();

    if (!recaptchaToken) {
      setError('Veuillez valider le reCAPTCHA.');
      return;
    }
    setError(null);
    setIsSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          nom: data.nom,
          prenom: data.prenom,
          genre: data.genre || 'non specifié',
          telephone: data.telephone,
          reply_to: data.email,
          message: data.message,
          'g-recaptcha-response': recaptchaToken,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setError(null);
      form.reset();
      recaptchaRef.current?.reset();
    } catch (err) {
      setError('Une erreur est survenue, veuillez réessayer.');
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-8 py-8 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-center text-[#C6A35E] m-6">
        Contactez-nous
      </h1>

      {/* informations Champs Obligatoires */}
      <p className="text-primary text-center font-light mb-10">
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
          aria-label="formulaire de contact"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full max-w-md p-6 bg-card border border-border rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(198,163,94,0.3)]"
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
                  <select
                    {...field}
                    className="w-full bg-input text-black rounded-xl px-4 py-2 border border-primary focus:ring-2 focus:ring-primary/60"
                  >
                    <option value="" disabled>
                      Choisissez votre genre
                    </option>
                    <option value="Homme" className="text-center">
                      Homme
                    </option>
                    <option value="Femme" className="text-center">
                      Femme
                    </option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
          {/* dois modifier le composant pour corriger bug d'affichage et colorie personnalisé */}
          {/* <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">Genre</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full rounded-xl border border-primary bg-input px-4 py-2 focus:ring-2 focus:ring-primary/60">
                      <SelectValue placeholder="Choisissez votre genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Homme">Homme</SelectItem>
                      <SelectItem value="Femme">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          /> */}

          {/* Champ Telephone */}
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">
                  Téléphone *
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
          <div className="w-full flex justify-center scale-75 sm:scale-100">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            />
          </div>

          {/* Bouton envoyer */}
          <Button
            variant="outline"
            type="submit"
            disabled={isSending}
            aria-busy={isSending}
            aria-disabled={isSending}
            //className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg px-6 py-2 mx-auto block transition"
            className="mt-6 block mx-auto font-bold bg-primary text-card rounded-xl hover:scale-105 hover:bg-primary/70"
          >
            {isSending ? 'Envoi...' : 'Envoyer'}
          </Button>
        </form>
      </Form>
    </section>
  );
}
