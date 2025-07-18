import { DataService } from '@/utils/data';
import { CardService } from '@/app/src/components/card';

export default function ServicesPage() {
  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-[#C6A35E] mb-8">
        Nos Services de Coaching & Nutrition
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DataService.map((data) => (
          <div id={data.id} key={data.id}>
            <CardService DataService={data} showLink={false} />
            {/* <p className="mt-2 text-sm text-[#D8D8D8] bg-[#1C1C1E] rounded-xl p-3">
              {data.longDescription}
            </p> */}
          </div>
        ))}
      </div>
    </section>
  );
}
