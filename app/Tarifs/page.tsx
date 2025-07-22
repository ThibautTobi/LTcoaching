import { DataService } from '@/utils/data';
//import Link from 'next/link';

/**
 * redirection avec plus d'information sur chaque service en reflexion
 */

export default function TarifsPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-[#C6A35E] mb-6">
        Tarifs
      </h1>

      <div className="space-y-6">
        {DataService.map((data) => (
          <div
            key={data.id}
            className="bg-[#26262a] border border-[#C6A35E] shadow-primary rounded-xl p-4"
          >
            <h2 className="text-xl font-semibold text-[#D8D8D8]">
              {data.title}{' '}
              <span className="text-primary font-normal">{data.price}</span>
            </h2>
            <p className="text-sm text-[#D8D8D8] mt-2">
              {data.shortDescription}
            </p>
            {/* <Link
              href={`/Services/${data.id}`}
              className="inline-block mt-3 text-sm text-[#C6A35E] underline hover:text-[#C6A35E]/80"
            >
              Voir le service complet
            </Link> */}
          </div>
        ))}
      </div>
    </section>
  );
}
