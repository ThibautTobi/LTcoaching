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

import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/src/components/ui/alert';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = async (data: ContactFormData) => {
    console.log('from :', data);

    const recaptchaToken = recaptchaRef.current?.getValue();

    if (!recaptchaToken) {
      setError('Veuillez valider le reCAPTCHA.');
      return;
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
          'g-recaptcha-response': recaptchaToken,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      form.reset();
      recaptchaRef.current?.reset();
    } catch (err) {
      setError('Une erreur est survenue, veuillez réessayer.');
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-center text-[#C6A35E] mb-6">
        Contactez-nous
      </h1>
      {/* 
      <div className='w-20 h-20 bg-[#1C1C1E]'>
        1
      </div>
            <div className='w-20 h-20 bg-[#FFFFFF]'>
        2
      </div>
            <div className='w-20 h-20 bg-[#D8D8D8]'>
        3
      </div>
            <div className='w-20 h-20 bg-[#CBAE72]'>
        4
      </div>
      <div className='w-20 h-20 bg-[#CBA653]'>
        5
      </div>
      <div className='w-20 h-20 bg-[]'>
        6
      </div> */}

      {submitted && (
        <Alert className="bg-card text-primary border-4 border-primary rounded-xl m-8">
          <AlertTitle className="text-center p-2">Message envoyé</AlertTitle>
          <AlertDescription className="text-center">
            Merci ! Votre message a été envoyé avec succès.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert
          variant="destructive"
          className="bg-card text-primary border-4 border-primary rounded-xl m-8"
        >
          <AlertTitle className="text-center p-2">Erreur :</AlertTitle>
          <AlertDescription className="text-center">{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md p-6 bg-card border border-border rounded-2xl shadow-[0_0_30px_rgba(198,163,94,0.3)]"
        >
          {/* Champ Nom */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-sm">Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre nom"
                    className="rounded-xl bg-input text-black dark:text-white px-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
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
                <FormLabel className="text-primary text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre email"
                    className="rounded-xl bg-input text-black dark:text-white px-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
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
                <FormLabel className="text-primary text-sm">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Votre message"
                    className="rounded-xl bg-input text-black dark:text-white px-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition w-full resize-none"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* reCAPTCHA */}
          <div className="flex justify-center recaptcha-container">
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
