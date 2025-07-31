import Image from 'next/image';
import Link from 'next/link';
import { LucideBookOpen, LucideMapPin, Trophy } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

type CoachProfileCardProps = {
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  formations: string[];
  specialites: string[];
  experiences: string[];
  showContact?: boolean;
};

export default function CoachProfileCard({
  name,
  image,
  imageAlt,
  description,
  formations,
  specialites,
  experiences,
  showContact = true,
}: CoachProfileCardProps) {
  return (
    <article className="flex flex-col md:flex-row items-center gap-8 bg-card shadow-xl hover:shadow-[0_0_30px_rgba(198,163,94,0.3)] p-8 rounded-2xl transition-transform hover:border-primary hover:border-2 hover:scale-105 duration-300 ease-in-out">
      {/* Image Coach */}
      <div className="md:w-1/2 text-center">
        <Image
          src={image}
          alt={imageAlt}
          width={256}
          height={256}
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

        {/* Expériences */}
        {experiences.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Expériences professionnelles en salles :
            </h3>
            <ul className="space-y-1 text-sm">
              {experiences.map((exp, i) => (
                <li key={i} className="flex items-center gap-2">
                  <LucideMapPin className="w-4 h-4 text-primary" />
                  {exp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bouton contact */}
        {showContact && (
          <Link href="/Contact">
            <Button
              variant="outline"
              className="mt-6 block font-bold mx-auto bg-primary text-card rounded-xl hover:scale-105 hover:bg-primary/70"
            >
              Contactez-moi
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
}
