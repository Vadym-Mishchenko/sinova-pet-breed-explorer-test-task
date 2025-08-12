import { Breed, DogApiBreed, CatApiBreed } from '@/types/breeds';

const DOG_API_KEY = process.env.NEXT_PUBLIC_DOG_API_KEY || '';
const DOG_API_URL = 'https://api.thedogapi.com/v1/breeds';
const DOG_IMAGE_SEARCH_URL = 'https://api.thedogapi.com/v1/images/search?limit=1&breed_id=';

const CAT_API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY || '';
const CAT_API_URL = 'https://api.thecatapi.com/v1/breeds';
const CAT_IMAGE_SEARCH_URL = 'https://api.thecatapi.com/v1/images/search?limit=1&breed_id=';

type ImageSearchResponse = { url: string }[];

type ImageSearchItem = {
  id: string;
  url: string;
  breeds: DogApiBreed[] | CatApiBreed[];
};

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

async function fetchBreeds<T extends DogApiBreed | CatApiBreed>(
  apiUrl: string,
  apiKey: string,
  imageSearchUrl: string,
  type: 'dog' | 'cat',
): Promise<Breed[]> {
  const res = await fetch(apiUrl, { headers: { 'x-api-key': apiKey } });
  if (!res.ok) throw new Error(`Failed to fetch ${type} breeds`);

  const data: T[] = await res.json();

  return Promise.all(
    data.map(async (item) => {
      let imageUrl = item.image?.url;
      if (!imageUrl) {
        imageUrl = await fetchBreedImage(apiKey, imageSearchUrl, item.id);
      }
      return { ...item, image: imageUrl ? { url: imageUrl } : undefined, type } as Breed;
    }),
  );
}

export const fetchDogBreeds = () =>
  fetchBreeds<DogApiBreed>(DOG_API_URL, DOG_API_KEY, DOG_IMAGE_SEARCH_URL, 'dog');

export const fetchCatBreeds = () =>
  fetchBreeds<CatApiBreed>(CAT_API_URL, CAT_API_KEY, CAT_IMAGE_SEARCH_URL, 'cat');

export const fetchBreedImages = async (
  apiKey: string,
  breedId: string | number,
  limit = 4,
): Promise<string[]> => {
  const url = `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=${limit}`;
  const res = await fetch(url, { headers: { 'x-api-key': apiKey } });
  if (!res.ok) return [];
  const data: ImageSearchItem[] = await res.json();

  return data.map((item) => item.url);
};
