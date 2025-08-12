export type ApiImage = {
  id?: string;
  url: string;
  width?: number;
  height?: number;
};

export interface CatApiBreed {
  type: 'cat';
  id: string;
  name: string;
  description?: string;
  weight?: { metric: string };
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  cat_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  hairless?: boolean;
  hypoallergenic?: boolean;
  lap?: boolean;
  indoor?: boolean;
  experimental?: boolean;
  natural?: boolean;
  rare?: boolean;
  rex?: boolean;
  suppressed_tail?: boolean;
  short_legs?: boolean;
  temperament?: string;
  origin?: string;
  life_span?: string;
  images?: string[];
  image?: { url: string };
}

export interface DogApiBreed {
  type: 'dog';
  id: string | number;
  name: string;
  weight?: { metric: string };
  height?: { metric: string };
  life_span?: string;
  temperament?: string;
  origin?: string;
  bred_for?: string;
  breed_group?: string;
  images?: string[];
  image?: { url: string };
}

export type DogBreed = DogApiBreed & { type: 'dog' };
export type CatBreed = CatApiBreed & { type: 'cat' };

export type Breed = DogBreed | CatBreed;
