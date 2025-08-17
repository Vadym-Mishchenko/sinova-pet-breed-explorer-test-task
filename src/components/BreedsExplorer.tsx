'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';
import { Breed } from '@/types/breeds';
import { default as BreedCard } from './BreedCard';

const STORAGE_SEARCH_KEY = 'savedSearch';

interface Props {
  initialBreeds: Breed[];
  allBreeds: Breed[];
}

const BreedsExplorer = ({ initialBreeds, allBreeds }: Props) => {
  const [search, setSearch] = useState<string>(
    typeof window !== 'undefined' ? sessionStorage.getItem(STORAGE_SEARCH_KEY) || '' : '',
  );
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search);
      sessionStorage.setItem(STORAGE_SEARCH_KEY, search);
    }, 400);
    return () => clearTimeout(id);
  }, [search]);

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
          .filter((b) => b.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
          .slice(0, 5);

  const displayedBreeds =
    debouncedSearch.trim() === ''
      ? initialBreeds
      : allBreeds.filter((b) => b.name.toLowerCase().includes(debouncedSearch.toLowerCase()));

  const handleSuggestionClick = (name: string) => {
    setSearch(name);
    setShowSuggestions(false);
  };

  return (
    <>
      <div id="scroll-container" style={{ height: '100vh' }}>
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
          {displayedBreeds.length > 0 ? (
            displayedBreeds.map((breed, index) => (
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
          ) : (
            <p className="col-span-full text-center text-gray-500">Oops...No breeds found</p>
          )}
        </section>
      </div>
    </>
  );
};

export default BreedsExplorer;
