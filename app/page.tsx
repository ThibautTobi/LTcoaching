import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import PromoBande from './src/components/promo';

/**
 * Page d'accueil (`Home`).
 *
 * Cette page contient :
 * - Une bannière avec une image de fond et un dégradé.
 * - Une présentation des services proposés.
 * - Une section "Qui sommes-nous ?" décrivant l'équipe.
 * - Un appel à l'action final avec un bouton de contact.
 *
 * @page Home
 * @returns {JSX.Element} Contenu JSX de la page d'accueil.
 *
 * @example
 * // Utilisation par Next.js (fichier `app/page.tsx`)
 * export default function Page() {
 *   return <Home />;
 * }
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Section bannière principale avec image de fond */}
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
      {/* bandeau promo */}
      <PromoBande />
      {/* Section présentation de l'offre principale */}
      <section className="w-full py-10 px-6 text-center">
        <h1 className="text-[24px] font-bold md:text-5xl mb-4">
          Atteins tes objectifs avec <br />
          <span className="text-primary">LT coaching</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Transformez votre vie, votre entreprise , votre bien-être. Un
          accompagnement global sur-mesure:
          <br />
          Coaching personalisé, Nutrition, Yoga, Pilates et Soins Mère-enfant.
        </p>
      </section>

      {/* Section présentation de l'équipe */}
      <section className="py-4 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Qui sommes-nous ?
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Deux Coachs sportifs diplômés avec plus de 7 ans d&apos;expérience.
          <br />
          <br />
          Nous allons t&apos;aider à transformer ton corps et ton mental.
          <br />
          <br />
          Que tu veuilles perdre du poids, prendre du muscle, améliorer ta santé
          global ou tes qualités physiques spécifiques.Ou encore être accompagné
          à la préparation de concours ou tests physiques.
          <br />
          <br />
          Nous t&apos;accompagnerons pas à pas avec des séances sur-mesure
          personnalisées.
        </p>
      </section>

      {/* Section finale avec appel à l'action */}
      <section className="py-6 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Prêt à transformer ton corps et ta vie ?
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Contact nous dès maintenant et construisons ton plan ensemble.
        </p>
        <Link href="/Contact">
          {/* <Button
            size="lg"
            className="mt-6 block mx-auto p-2 font-bold bg-primary text-card rounded-xl hover:scale-110 hover:bg-primary/70"
          >
            Nous contacter
          </Button> */}

          <Button
            variant={'default'}
            className="px-6 py-3 hover:scale-110 hover:bg-primary/70"
          >
            Nous contacter
          </Button>
        </Link>

        {/* <Link href="/Contact">
          <div className="relative inline-block"> */}
        {/* Losange décoratif (bordure) */}
        {/* <div
              aria-hidden="true"
              className="absolute inset-0 bg-white z-0 pointer-events-none"
              style={{
                clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0% 100%)',
                transform: 'scale(1.15, 1.35)', 

                transformOrigin: 'center', // centre le scaling
              }}
            >
            </div> */}

        {/* Bouton cliquable */}
        {/* <Button
              className="relative z-10 bg-primary text-card font-bold italic px-6 py-3 hover:scale-110 hover:bg-primary/70"
              style={{
                clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
              }}
            >
              Nous contacter
            </Button>
          </div>
        </Link> */}
      </section>
    </main>
  );
}
