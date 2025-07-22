import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Atteins tes objectifs avec{' '}
          <span className="text-primary">LTcoaching</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Coaching personnalisé, suivi nutritionnel, motivation constante. des
          coachs diplômés à tes côtés, à domicile ou en ligne.
        </p>
        <Link href="/Contact">
          <Button size="lg" className="rounded-full px-6 text-base shadow-md">
            Réserve ta séance
          </Button>
        </Link>
      </section>

      {/* Présentation */}
      <section className="py-10 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Qui sommes-nous ?
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Des Coachs sportif diplômé avec plus de 7 ans d&apos;expérience, nous
          allons t&apos;aider à transformer ton corps et ton mental. Que tu
          veuilles perdre du poids, prendre du muscle ou améliorer ta santé,
          nous t&apos;accompagnerons pas à pas avec des séances sur-mesure et un
          vrai suivi.
        </p>
      </section>

      {/* Appel à l'action final */}
      <section className="py-6 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Prêt à transformer ton corps et ta vie ?
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Réserve une séance dès maintenant et construisons ton plan ensemble.
        </p>
        <Link href="/Contact">
          <Button size="lg" className="rounded-full px-6 text-base shadow-md">
            Nous contacter
          </Button>
        </Link>
      </section>
    </main>
  );
}
