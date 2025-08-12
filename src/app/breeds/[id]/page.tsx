import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breed } from '@/types/breeds';
import { getBreedById } from '@/lib/api/getBreedById';
import Link from 'next/link';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function BreedDetailsPage({ params }: IProps) {
  const { id } = await params;
  const breed = (await getBreedById(id)) as Breed | null;

  if (!breed) notFound();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="flex items-center mb-4">
        <Link href="/" className="mr-3 p-1 rounded hover:bg-gray-200 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold">{breed.name}</h1>
      </div>

      {breed.images && breed.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {breed.images.slice(0, 4).map((imgUrl, index) => (
            <div key={index} className="relative w-full h-64 sm:h-80">
              <Image
                src={imgUrl}
                alt={`${breed.name} image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      ) : breed.image?.url ? (
        <div className="relative w-full h-96 mb-6">
          <Image
            src={breed.image.url}
            alt={breed.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority={true}
          />
        </div>
      ) : null}

      {breed.type === 'cat' ? (
        <>
          {breed.description && <p className="mb-4">{breed.description}</p>}

          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li>
              <b>Origin:</b> {breed.origin || 'Unknown'}
            </li>
            <li>
              <b>Life Span:</b> {breed.life_span || 'Unknown'}
            </li>
            {breed.weight?.metric && (
              <li>
                <b>Weight:</b> {breed.weight.metric} kg
              </li>
            )}
            <li>
              <b>Temperament:</b> {breed.temperament || 'Unknown'}
            </li>
          </ul>

          <ul className="list-disc pl-5 space-y-1 mb-6 grid grid-cols-2 gap-2 max-w-sm">
            <li>
              <b>Adaptability:</b> {breed.adaptability ?? 'N/A'} / 5
            </li>
            <li>
              <b>Affection Level:</b> {breed.affection_level ?? 'N/A'} / 5
            </li>
            <li>
              <b>Child Friendly:</b> {breed.child_friendly ?? 'N/A'} / 5
            </li>
            <li>
              <b>Cat Friendly:</b> {breed.cat_friendly ?? 'N/A'} / 5
            </li>
            <li>
              <b>Dog Friendly:</b> {breed.dog_friendly ?? 'N/A'} / 5
            </li>
            <li>
              <b>Energy Level:</b> {breed.energy_level ?? 'N/A'} / 5
            </li>
            <li>
              <b>Grooming:</b> {breed.grooming ?? 'N/A'} / 5
            </li>
            <li>
              <b>Health Issues:</b> {breed.health_issues ?? 'N/A'} / 5
            </li>
            <li>
              <b>Intelligence:</b> {breed.intelligence ?? 'N/A'} / 5
            </li>
            <li>
              <b>Shedding Level:</b> {breed.shedding_level ?? 'N/A'} / 5
            </li>
            <li>
              <b>Social Needs:</b> {breed.social_needs ?? 'N/A'} / 5
            </li>
            <li>
              <b>Stranger Friendly:</b> {breed.stranger_friendly ?? 'N/A'} / 5
            </li>
            <li>
              <b>Vocalisation:</b> {breed.vocalisation ?? 'N/A'} / 5
            </li>
          </ul>

          <ul className="list-disc pl-5 space-y-1 max-w-sm">
            <li>
              <b>Hairless:</b> {breed.hairless ? '+' : '-'}
            </li>
            <li>
              <b>Hypoallergenic:</b> {breed.hypoallergenic ? '+' : '-'}
            </li>
            <li>
              <b>Loves to sit on laps:</b> {breed.lap ? '+' : '-'}
            </li>
            <li>
              <b>Indoor cat:</b> {breed.indoor ? '+' : '-'}
            </li>
            <li>
              <b>Experimental breed:</b> {breed.experimental ? '+' : '-'}
            </li>
            <li>
              <b>Natural breed:</b> {breed.natural ? '+' : '-'}
            </li>
            <li>
              <b>Rare breed:</b> {breed.rare ? '+' : '-'}
            </li>
            <li>
              <b>Rex breed:</b> {breed.rex ? '+' : '-'}
            </li>
            <li>
              <b>Suppressed tail:</b> {breed.suppressed_tail ? '+' : '-'}
            </li>
            <li>
              <b>Short legs:</b> {breed.short_legs ? '+' : '-'}
            </li>
          </ul>
        </>
      ) : breed.type === 'dog' ? (
        <>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li>
              <b>Origin:</b> {breed.origin || 'Unknown'}
            </li>
            <li>
              <b>Life Span:</b> {breed.life_span || 'Unknown'}
            </li>
            {breed.weight?.metric && (
              <li>
                <b>Weight:</b> {breed.weight.metric} kg
              </li>
            )}
            {breed.height?.metric && (
              <li>
                <b>Height:</b> {breed.height.metric} cm
              </li>
            )}
            <li>
              <b>Temperament:</b> {breed.temperament || 'Unknown'}
            </li>
            <li>
              <b>Bred For:</b> {breed.bred_for || 'Unknown'}
            </li>
            <li>
              <b>Breed Group:</b> {breed.breed_group || 'Unknown'}
            </li>
          </ul>
        </>
      ) : null}
    </main>
  );
}
