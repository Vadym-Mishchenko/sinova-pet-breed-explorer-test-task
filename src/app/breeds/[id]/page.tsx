import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breed } from '@/types/breeds';
import { getBreedById } from '@/lib/api/getBreedById';

interface PageProps {
  params: { id: string };
}

export default async function BreedDetailsPage({ params }: PageProps) {
  const breed: Breed | null = await getBreedById(params.id);

  if (!breed) notFound();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{breed.name}</h1>
      {breed.image?.url && (
        <div className="relative w-full h-96 mb-6">
          <Image
            src={breed.image.url}
            alt={breed.name}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      )}
      {'description' in breed && breed.description && <p className="mb-4">{breed.description}</p>}

      {breed.type === 'cat' ? (
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Adaptability:</b> {breed.adaptability}
          </li>
          <li>
            <b>Affection Level:</b> {breed.affection_level}
          </li>
          <li>
            <b>Child Friendly:</b> {breed.child_friendly}
          </li>
          <li>
            <b>Energy Level:</b> {breed.energy_level}
          </li>
        </ul>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Bred For:</b> {breed.bred_for}
          </li>
          <li>
            <b>Breed Group:</b> {breed.breed_group}
          </li>
          <li>
            <b>Life Span:</b> {breed.life_span}
          </li>
          <li>
            <b>Origin:</b> {breed.origin}
          </li>
        </ul>
      )}
    </main>
  );
}
