import { Breed, DogApiBreed, CatApiBreed } from '@/types/breeds';

const DOG_API_KEY = process.env.NEXT_PUBLIC_DOG_API_KEY || '';
const DOG_API_URL = 'https://api.thedogapi.com/v1/breeds';
const DOG_IMAGE_SEARCH_URL = 'https://api.thedogapi.com/v1/images/search?limit=1&breed_id=';

const CAT_API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY || '';
const CAT_API_URL = 'https://api.thecatapi.com/v1/breeds';
const CAT_IMAGE_SEARCH_URL = 'https://api.thecatapi.com/v1/images/search?limit=1&breed_id=';

type ImageSearchResponse = { url: string }[];

const fetchBreedImage = async (
  apiKey: string,
  url: string,
  breedId: string | number,
): Promise<string | undefined> => {
  const res = await fetch(`${url}${breedId}`, { headers: { 'x-api-key': apiKey } });
  if (!res.ok) return undefined;
  const data: ImageSearchResponse = await res.json();
  return data.length > 0 ? data[0].url : undefined;
};

export async function getBreedById(id: string): Promise<Breed | null> {
  const dogRes = await fetch(DOG_API_URL, { headers: { 'x-api-key': DOG_API_KEY } });
  if (!dogRes.ok) throw new Error('Failed to fetch dog breeds');
  const dogs: DogApiBreed[] = await dogRes.json();
  const dogBreed = dogs.find((breed) => String(breed.id) === id);
  if (dogBreed) {
    let imageUrl = dogBreed.image?.url;
    if (!imageUrl) {
      imageUrl = await fetchBreedImage(DOG_API_KEY, DOG_IMAGE_SEARCH_URL, dogBreed.id);
    }
    return { ...dogBreed, image: imageUrl ? { url: imageUrl } : undefined, type: 'dog' };
  }

  const catRes = await fetch(CAT_API_URL, { headers: { 'x-api-key': CAT_API_KEY } });
  if (!catRes.ok) throw new Error('Failed to fetch cat breeds');
  const cats: CatApiBreed[] = await catRes.json();
  const catBreed = cats.find((breed) => breed.id === id);
  if (catBreed) {
    let imageUrl = catBreed.image?.url;
    if (!imageUrl) {
      imageUrl = await fetchBreedImage(CAT_API_KEY, CAT_IMAGE_SEARCH_URL, catBreed.id);
    }
    return { ...catBreed, image: imageUrl ? { url: imageUrl } : undefined, type: 'cat' };
  }

  return null;
}
