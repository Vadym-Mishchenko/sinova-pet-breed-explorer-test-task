'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchCatBreeds, fetchDogBreeds } from '@/lib/api/breedsApi';
import { BreedCard } from '@/components/BreedCard';
import { Loader } from '@/components/Loader';
import { Breed } from '@/types/breeds';
import { FaPaw } from 'react-icons/fa';

const STORAGE_SEARCH_KEY = 'savedSearch';

const Home = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const savedSearch =
    typeof window !== 'undefined' ? sessionStorage.getItem(STORAGE_SEARCH_KEY) || '' : '';
  const [search, setSearch] = useState(savedSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(savedSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      sessionStorage.setItem(STORAGE_SEARCH_KEY, search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    async function loadBreeds() {
      try {
        setLoading(true);
        const dogs = await fetchDogBreeds();
        const cats = await fetchCatBreeds();

        const all = [...dogs, ...cats];
        setAllBreeds(all);

        const randomDogs = dogs.sort(() => 0.5 - Math.random()).slice(0, 3);
        const randomCats = cats.sort(() => 0.5 - Math.random()).slice(0, 3);
        setBreeds([...randomDogs, ...randomCats]);
      } catch (err) {
        setError(`Failed to load breeds: ${err}`);
      } finally {
        setLoading(false);
      }
    }
    loadBreeds();
  }, []);

  const displayedBreeds =
    debouncedSearch.trim() === ''
      ? breeds
      : allBreeds.filter((breed) =>
          breed.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        );

  if (loading) return <Loader />;
  if (error) return <p className="text-center p-8 text-red-600">{error}</p>;

  return (
    <main className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Sinova Pet Breed Explorer</h1>

      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search breeds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border border-gray-300 px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaPaw className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {displayedBreeds.length > 0 ? (
          displayedBreeds.map((breed, index) => (
            <motion.div
              key={`${breed.type}-${breed.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.2 }}
              className="w-full flex justify-center"
            >
              <BreedCard breed={breed} />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Oops...No breeds found</p>
        )}
      </section>
    </main>
  );
};

export default Home;
