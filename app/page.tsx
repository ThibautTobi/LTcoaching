import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative w-full h-[250px] md:h-[300x] lg:h-[350px] xl:h-[450px] 2xl:h-[500px] overflow-hidden">
        <Image
          src="/sport-acceuil.jpg"
          alt="image-sport"
          fill
          className="object-cover w-full h-full"
          sizes=" 100vw "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
      </div>

      <section className="w-full py-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Atteins tes objectifs avec{' '}
          <span className="text-primary">LTcoaching</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Coaching personnalisé, suivi nutritionnel, préparation mentale.
          <br />
          Des coachs diplômés à tes côtés, pour atteindre tes objectifs.
        </p>
      </section>

      <section className="py-4 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Qui sommes-nous ?
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Deux Coachs sportifs diplômés avec plus de 7 ans d&apos;expérience.
          <br />
          Nous allons t&apos;aider à transformer ton corps et ton mental.
          <br />
          Que tu veuilles perdre du poids, prendre du muscle, améliorer des
          qualités physiques specifique, preparation de concours ou tests
          physiques ou améliorer ta santé global.
          <br />
          Nous t&apos;accompagnerons pas à pas avec des séances sur-mesure
          personnalisé pour tes objectifs sportif ou santé et un vrai suivi.
        </p>
      </section>

      {/* Appel à l'action final */}
      <section className="py-6 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Prêt à transformer ton corps et ta vie ?
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Contact nous dès maintenant et construisons ton plan ensemble.
        </p>
        <Link href="/Contact">
          <Button
            size="lg"
            className="mt-6 block mx-auto p-2 font-bold bg-primary text-card rounded-xl hover:scale-105 hover:bg-primary/70"
          >
            Nous contacter
          </Button>
        </Link>
      </section>
    </main>
  );
}
