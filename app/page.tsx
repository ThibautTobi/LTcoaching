import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full">
        <h1 className="font-bold mb-4">
          Atteins tes objectifs avec{' '}
          <span className="text-blue-600">LTcoaching</span>
        </h1>
        <p className="text-lg mb-6">
          Coaching personnalisé, suivi nutritionnel, motivation constante.
        </p>
        <Link href="/contact">Réserve ta séance</Link>
      </section>

      {/* Présention */}
      <section className="px-4">
        <h2 className="mb-4">Qui sommes nous ?</h2>
        <p>
          Coach sportif diplômé avec plus de 7 ans d expérience, je t’aide à
          transformer ton corps et ton mental. Que tu veuilles perdre du poids,
          prendre du muscle, ou améliorer ta santé, je t’accompagne pas à pas
          avec des séances sur-mesure et un vrai suivi.
        </p>
      </section>

      {/* Services */}
      <section className="px-4">
        <div>
          <h2 className="font-semibold">Mes services</h2>
          <div className="gap-6">
            <div>
              Coaching en salle
              <br />
              Séances personnalisées dans ta salle ou la mienne. Suivi et plan
              sur mesure.
              <div />
              <div>
                Coaching à domicile
                <br />
                Je me déplace chez toi avec le matériel nécessaire. Confort &
                efficacité.
              </div>
              <div>
                Coaching en ligne
                <br />
                Plans d’entraînement + visioconférences. Idéal pour garder le
                rythme à distance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="px-4 text-center">
        <h2 className="font-bold">Prêt à transformer ton corps et ta vie ?</h2>
        <p className="p-4">
          Réserve une séance gratuite pour faire le point ensemble.
        </p>
        <Link href="/contact">Me contacter</Link>
      </section>
    </>
  );
}
