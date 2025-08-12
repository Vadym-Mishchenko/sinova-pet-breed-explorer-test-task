export type ApiImage = {
  id?: string;
  url: string;
  width?: number;
  height?: number;
};

export type CatApiBreed = {
  id: string;
  name: string;
  temperament?: string;
  life_span?: string;
  origin?: string;
  description?: string;
  adaptability?: number;
  affection_level?: number;
  alt_names?: string;
  cfa_url?: string;
  child_friendly?: number;
  country_code?: string;
  country_codes?: string;
  dog_friendly?: number;
  energy_level?: number;
  experimental?: number;
  grooming?: number;
  hairless?: number;
  health_issues?: number;
  hypoallergenic?: number;
  image?: ApiImage;
};

export type DogApiBreed = {
  id: number;
  name: string;
  temperament?: string;
  life_span?: string;
  origin?: string;
  bred_for?: string;
  breed_group?: string;
  height?: {
    imperial?: string;
    metric?: string;
  };
  reference_image_id?: string;
  image?: ApiImage;
};

export type DogBreed = DogApiBreed & { type: 'dog' };
export type CatBreed = CatApiBreed & { type: 'cat' };

export type Breed = DogBreed | CatBreed;
