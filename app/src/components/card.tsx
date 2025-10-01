import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { DataType } from '@/utils/data';
import Image from 'next/image';

/**
 * Composant React `CardService` utilisé pour afficher une carte de service.
 *
 * Ce composant est utilisé pour présenter un service de coaching, bien-être ou nutrition.
 * Il peut afficher une image, un lien vers la page de tarifs, ou simplement les informations de base.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {DataType} props.DataService - L'objet contenant les données du service (titre, image, description, etc.).
 * @param {boolean} [props.showLink=false] - Détermine si le bouton "Voir Le Prix" est affiché.
 * @param {boolean} [props.showImage=false] - Détermine si l'image du service est affichée.
 * @param {boolean} [props.showPrice=false] - Détermine si le prix du service est affichée.
 * @param {boolean} [props.showDescription=false] - Détermine si la description du service est affichée.
 * @param {boolean} [props.showListe=false] - Détermine si la liste du service est affichée.
 *
 * @example
 * <CardService DataService={monService} showLink={true} showImage={true} showPrice={true}/>
 */

export const CardService = ({
  DataService,
  showDescription = false,
  showListe = false,
  showLink = false,
  showImage = false,
  showPrice = false,
}: {
  DataService: DataType;
  showDescription?: boolean;
  showListe?: boolean;
  showLink?: boolean;
  showImage?: boolean;
  showPrice?: boolean;
}) => {
  return (
    <Card className="bg-[#26262a] border border-primary shadow-primary rounded-xl p-4 transition-all flex flex-col w-full h-full">
      <CardTitle className="text-xl font-semibold text-primary p-4 text-center">
        {DataService.title}
      </CardTitle>
      <CardContent className="text-[#D8D8D8] text-sm flex-1 flex flex-col items-center justify-between">
        {showImage && (
          <div className="relative w-[200px] h-[200px] sm:w-[170px] sm:h-[170px] md:w-[220px] md:h-[220px] ">
            <Image
              src={DataService.image}
              fill
              alt={DataService.imageAlt}
              className="rounded-2xl object-cover shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            />
          </div>
        )}
        {showDescription && (
          <p className="text-left pt-6" style={{ whiteSpace: 'pre-line' }}>
            {DataService.description}
          </p>
        )}
        {showListe && (
          <ul className="pt-4 font-semibold text-center">
            {DataService.liste.map((item, id) => (
              <li key={id} className="p-2 text-primary">
                * {item}
              </li>
            ))}
          </ul>
        )}
        {showPrice && (
          <p className="text-primary font-bold text-center py-4">
            {DataService.price}
          </p>
        )}
        {showLink && (
          <Link
            // si creation d'une page de redirection que pour le service href={`/services#${DataService.id}`}
            href={'/Tarifs'}
          >
            <Button
              variant={'default'}
              className="mt-6 block mx-auto hover:scale-110 hover:bg-primary/70"
            >
              Voir Le Prix
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
