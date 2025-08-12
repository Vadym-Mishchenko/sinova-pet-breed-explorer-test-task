'use client';

import { useState, useEffect, useRef } from 'react';
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

  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions =
    debouncedSearch.trim() === ''
      ? []
      : allBreeds
          .filter((breed) => breed.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
          .slice(0, 5);

  const displayedBreeds =
    debouncedSearch.trim() === ''
      ? breeds
      : allBreeds.filter((breed) =>
          breed.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        );

  const handleSuggestionClick = (name: string) => {
    setSearch(name);
    setShowSuggestions(false);
  };

  return (
    <>
      <div
        id="scroll-container"
        style={{
          height: '100vh',
          overflowY: loading ? 'hidden' : 'auto',
        }}
      >
        {error && <p className="text-center p-8 text-red-600">{error}</p>}

        {!error && (
          <main className="min-h-screen p-8 max-w-[1200px] mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Pet Breed Explorer</h1>

            <div className="mb-6 flex justify-center relative max-w-md mx-auto w-full">
              <input
                type="text"
                placeholder="Search breeds..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full rounded border border-gray-300 px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
                autoComplete="off"
                onFocus={() => setShowSuggestions(true)}
              />
              <FaPaw className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />

              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul
                  ref={suggestionsRef}
                  className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-48 overflow-auto rounded shadow-md"
                  style={{ top: 'calc(100% + 0.25rem)' }}
                >
                  {filteredSuggestions.map((breed) => (
                    <li
                      key={breed.id}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(breed.name)}
                    >
                      {breed.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {displayedBreeds.length > 0
                ? displayedBreeds.map((breed, index) => (
                    <motion.div
                      key={`${breed.type}-${breed.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.2 }}
                      className="w-full flex justify-center"
                    >
                      <BreedCard breed={breed} priority={index < 6} />
                    </motion.div>
                  ))
                : !loading && (
                    <p className="col-span-full text-center text-gray-500">
                      Oops...No breeds found
                    </p>
                  )}
            </section>
          </main>
        )}
      </div>

      {loading && <Loader />}
    </>
  );
};

export default Home;
