import { notFound } from 'next/navigation';
import { DataService } from '@/utils/data';
import { DataType } from '@/utils/data';
import { CardService } from '@/app/src/components/card';

// Optionnel : génération statique pour les performances (SSG)
export async function generateStaticParams() {
  return DataService.map((service: DataType) => ({
    id: service.id,
  }));
}

// Props automatiquement typés par Next.js
interface ServicePageProps {
  params: {
    id: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = DataService.find((item: DataType) => item.id === params.id);

  if (!service) {
    return notFound();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
      <CardService DataService={service} showLink={false} />
    </main>
  );
}
