import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/src/components/ui/card';
import { dataType } from '@/utils/data';
//import Image from 'next/image';

export const CardService = ({
  DataService,
  showLink = true,
}: {
  DataService: dataType;
  showLink?: boolean;
}) => {
  return (
    <Card className="bg-[#26262a] border border-primary shadow-primary rounded-xl p-4 transition-all">
      <CardTitle className="text-xl font-semibold text-primary mb-2 text-center">
        {DataService.title}
      </CardTitle>
      <CardContent className="text-[#D8D8D8] text-sm">
        {/* <Image
          src={DataService.image}
          width={40}
          height={40}
          alt={DataService.imageAlt}
        
        /> */}
        <p>{DataService.shortDescription}</p>
        <p>{DataService.bigDescription}</p>
        {showLink && (
          <Link
            href={`/services#${DataService.id}`}
            className="inline-block mt-4 text-sm text-primary underline hover:text-primary/80"
          >
            Voir Le Prix
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
