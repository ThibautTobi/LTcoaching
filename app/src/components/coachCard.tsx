import Image from 'next/image';
import Link from 'next/link';
import { LucideBookOpen, Trophy } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

/**
 * Composant `CoachProfileCard`
 *
 * Ce composant affiche une carte détaillée pour présenter un coach sportif,
 * avec son image, son nom, sa description, ses formations, ses spécialités,
 * et éventuellement un bouton de contact.
 *
 * @component
 * @example
 * <CoachProfileCard
 *   name="Laure"
 *   image="/images/laure.png"
 *   imageAlt="Portrait de Laure, coach sportif experte en yoga"
 *   description="Coach diplômée spécialisée en yoga, pilates et nutrition."
 *   formations={[
 *     'BPJEPS AF - Haltérophilie/Musculation et Cours Collectifs',
 *     'Coach en nutrition'
 *   ]}
 *   specialites={['Yoga', 'Pilates', 'Bien-être']}
 *   showContact={true}
 * />
 *
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.name - Nom du coach.
 * @param {string} props.image - URL de l’image du coach.
 * @param {string} props.imageAlt - Texte alternatif de l’image (important pour l’accessibilité et le SEO).
 * @param {string} props.description - Description du coach.
 * @param {string[]} props.formations - Liste des formations du coach.
 * @param {string[]} props.specialites - Liste des spécialités du coach.
 * @param {boolean} [props.showContact=true] - Si `true`, affiche le bouton "Contactez-moi".
 *
 * @returns {JSX.Element} Une carte profil interactive et responsive pour présenter un coach.
 */

type CoachProfileCardProps = {
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  formations: string[];
  specialites: string[];
  showContact?: boolean;
};

export default function CoachProfileCard({
  name,
  image,
  imageAlt,
  description,
  formations,
  specialites,
  showContact = true,
}: CoachProfileCardProps) {
  return (
    <article className="flex flex-col md:flex-row items-center gap-8 bg-card shadow-xl hover:shadow-[0_0_30px_rgba(198,163,94,0.3)] p-8 rounded-2xl transition-transform hover:border-primary hover:border-2 hover:scale-105 duration-300 ease-in-out">
      <div className="md:w-1/2 text-center">
        <Image
          src={image}
          alt={imageAlt}
          width={256}
          height={256}
          aria-label={`Photo de ${name}, coach sportif`}
          className="rounded-full object-cover border-4 border-white shadow mx-auto"
        />
      </div>

      {/* Infos Coach */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-primary text-center md:text-left">
          {name}
        </h2>

        <p className="text-muted-foreground text-justify">{description}</p>

        {/* Formations */}
        {formations.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Formations :</h3>
            <ul className="space-y-1 text-sm">
              {formations.map((formation, i) => (
                <li key={i} className="flex items-center gap-2">
                  <LucideBookOpen className="w-4 h-4 text-primary" />
                  {formation}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Spécialités */}
        {specialites.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Mes Spécialités :</h3>
            <ul className="space-y-1 text-sm">
              {specialites.map((spec, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bouton contact */}
        {showContact && (
          <Link href="/Contact">
            <Button
              variant={'default'}
              className="mt-6 block mx-auto hover:scale-110 hover:bg-primary/70"
            >
              Contactez-moi
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
}
