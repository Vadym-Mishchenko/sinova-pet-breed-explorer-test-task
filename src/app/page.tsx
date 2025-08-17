import { fetchCatBreeds, fetchDogBreeds } from '@/lib/api/breedsApi';
import { BreedsExplorer, LoaderStopper } from '@/components';
import { Breed } from '@/types/breeds';

const HomePage = async () => {
  let allBreeds: Breed[] = [];
  let initialBreeds: Breed[] = [];

  try {
    const dogs = await fetchDogBreeds();
    const cats = await fetchCatBreeds();

    allBreeds = [...dogs, ...cats];

    const randomDogs = dogs.sort(() => 0.5 - Math.random()).slice(0, 3);
    const randomCats = cats.sort(() => 0.5 - Math.random()).slice(0, 3);
    initialBreeds = [...randomDogs, ...randomCats];
  } catch (err) {
    console.error('Failed to load breeds', err);
  }

  return (
    <main className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <LoaderStopper />
      <h1 className="text-4xl font-bold mb-8 text-center">Pet Breed Explorer</h1>
      <BreedsExplorer initialBreeds={initialBreeds} allBreeds={allBreeds} />
    </main>
  );
};

export default HomePage;
