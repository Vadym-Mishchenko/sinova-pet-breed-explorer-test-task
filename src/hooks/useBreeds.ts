'use client';

import { useEffect, useState } from 'react';
import { Breed } from '@/types/breeds';
import { fetchCatBreeds, fetchDogBreeds } from '@/lib/api/breedsApi';

export function useBreeds() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [dogs, cats] = await Promise.all([fetchDogBreeds(), fetchCatBreeds()]);

        const randomDogs = dogs.sort(() => 0.5 - Math.random()).slice(0, 3);
        const randomCats = cats.sort(() => 0.5 - Math.random()).slice(0, 3);

        setBreeds([...randomDogs, ...randomCats]);
        setAllBreeds([...dogs, ...cats]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load breeds');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { breeds, allBreeds, loading, error };
}
