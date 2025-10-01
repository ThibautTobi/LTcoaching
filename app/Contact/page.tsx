'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA, { ReCAPTCHA as ReCAPTCHATypes } from 'react-google-recaptcha';
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

import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/src/components/ui/alert';

/**
 *  Schéma de validation du formulaire de contact avec Zod.
 * - Vérifie que chaque champ respecte les contraintes (longueur, format, etc.)
 * - Fournit des messages d'erreur personnalisés
 */

const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  prenom: z.string().min(2, 'Le prénom est requis'),
  genre: z.enum(['Homme', 'Femme']).or(z.literal('')).optional(),
  telephone: z
    .string()
    .min(1, 'Le numéro de téléphone est requis')
    .transform((val) => val.replace(/\D/g, '')) // Supprime tout caractère non numérique
    .refine(
      (val) => val.length === 10,
      'Le numéro doit contenir exactement 10 chiffres'
    ),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
});

/**
 *  Type dérivé automatiquement du schéma Zod.
 * - Permet d'avoir l'auto-complétion et la sécurité de types dans le code.
 */

type ContactFormData = z.infer<typeof contactSchema>;

/**
 *  Page de contact contenant :
 * - Un formulaire validé par Zod + React Hook Form
 * - Une vérification ReCAPTCHA
 * - Un envoi de mail via EmailJS
 * - Des messages de succès ou d'erreur
 *
 * @returns JSX.Element
 */

export default function ContactPage() {
  // État pour gérer l'envoi en cours
  const [isSending, setIsSending] = useState(false);
  // État pour savoir si le formulaire a été soumis avec succès
  const [submitted, setSubmitted] = useState(false);
  // État pour stocker les erreurs éventuelles
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialisation de React Hook Form avec :
   * - Le resolver Zod (qui applique le schéma contactSchema)
   * - Des valeurs par défaut pour chaque champ
   */

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

  /** Référence vers le composant ReCAPTCHA (pour récupérer et reset le token) */

  const recaptchaRef = useRef<ReCAPTCHATypes>(null);

  /**
   *  Fonction appelée à la soumission du formulaire
   * @param data Données validées du formulaire
   */

  const onSubmit = async (data: ContactFormData) => {
    console.log('Formulaire envoyé  :', data);

    // Récupération du token ReCAPTCHA
    const recaptchaToken = recaptchaRef.current?.getValue();

    // Si l'utilisateur n'a pas validé le captcha → erreur
    if (!recaptchaToken) {
      setError('Veuillez valider le reCAPTCHA.');
      return;
    }

    setError(null);
    // Active le mode "chargement"
    setIsSending(true);

    try {
      // Envoi du mail avec EmailJS
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

      // Succès → affichage du message de confirmation
      setSubmitted(true);
      // Aucune Erreur reste a null
      setError(null);
      // Reset du formulaire
      form.reset();
      // Reset du captcha
      recaptchaRef.current?.reset();
    } catch (err) {
      // Erreur lors de l’envoi
      setError('Une erreur est survenue, veuillez réessayer.');
      console.error(err);
    } finally {
      // Fin du mode "chargement"
      setIsSending(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-8 py-8 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      {/* Titre et description */}
      <h1 className="text-[24px] font-bold text-center text-[#C6A35E] m-6">
        Contactez-nous
      </h1>
      <p className="text-mute text-center font-light mb-10">
        Vous avez des questions, besoin d’un accompagnement personnalisé ou
        souhaitez prendre rendez-vous ?
        <br />
        Notre équipe de coachs sportifs à Villers-Ecalles est à votre écoute.
        <br />
        Remplissez ce formulaire de contact, nous vous répondrons rapidement.
        <br />
        <br />* Champs Obligatoires
      </p>

      {/* Message de succès */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Alert className="bg-card text-primary border-4 border-primary rounded-xl max-w-md w-full mx-4 shadow-xl">
            <AlertTitle className="text-center p-2 text-xl font-semibold">
              Message envoyé
            </AlertTitle>
            <AlertDescription className="text-center px-4 pb-4">
              Merci ! Votre message a été envoyé avec succès.
            </AlertDescription>
            <div className="flex justify-center pb-2">
              <Button
                variant="outline"
                className="bg-destructive text-white hover:bg-destructive/80 rounded-xl"
                onClick={() => setSubmitted(false)}
              >
                Fermer
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* Message d'erreur */}
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
            <div className="flex justify-center pb-2">
              <Button
                variant="outline"
                className="bg-destructive text-white hover:bg-destructive/80 rounded-xl"
                onClick={() => setError(null)}
              >
                Fermer
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* Formulaire avec React Hook Form */}
      <Form {...form}>
        <form
          aria-label="formulaire de contact"
          onSubmit={form.handleSubmit(onSubmit)} // Liaison du submit avec RHF
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
                    {...field}
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
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
                <FormLabel className="text-primary text-sm">Prénom *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre Prénom"
                    {...field}
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Genre */}
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
                    {...field}
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
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
                    {...field}
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
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
                    {...field}
                    className="rounded-xl bg-input text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full resize-none"
                    rows={5}
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

          {/* Bouton envoyer formulaire */}
          <Button
            variant={'default'}
            type="submit"
            disabled={isSending}
            aria-busy={isSending}
            aria-disabled={isSending}
            className="mt-6 block mx-auto hover:scale-110 hover:bg-primary/70"
          >
            {isSending ? 'Envoi...' : 'Envoyer'}
          </Button>
        </form>
      </Form>
    </section>
  );
}
