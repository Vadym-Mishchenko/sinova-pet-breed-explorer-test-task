'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Breed } from '@/types/breeds';
import { FaCat, FaDog } from 'react-icons/fa';

type IProps = {
  breed: Breed;
  priority?: boolean;
};

const BreedCardComponent = ({ breed, priority }: IProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(`/breeds/${breed.id}`);
  };

  return (
    <div
      className="
        relative flex w-80 h-[360px] my-6 flex-col justify-between
        rounded-xl bg-white shadow-2xl text-gray-700 group
        cursor-pointer hover:bg-gray-50 transition-transform 
        duration-300 ease-in-out hover:-translate-y-3
      "
      onClick={handleClick}
    >
      <div className="relative mx-4 -mt-6 h-70 overflow-hidden rounded-xl bg-clip-border shadow-lg">
        {breed.image?.url && (
          <Image
            src={breed.image.url}
            alt={breed.name}
            fill
            sizes="320px"
            style={{ objectFit: 'cover' }}
            priority={priority}
            className="rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-3">
        <h3 className="mb-10 font-sans text-xl text-center font-semibold leading-snug tracking-normal text-gray-900 antialiased">
          {breed.name}
        </h3>
        <div className="relative">
          <div
            className={`
              absolute left-1/2 -bottom-6 transform -translate-x-1/2
              w-14 h-14 flex items-center justify-center
              rounded-full bg-white text-black
              border-4 border-white shadow-lg
              ${loading ? 'animate-spin' : ''}
            `}
          >
            {breed.type === 'cat' ? (
              <FaCat className="text-2xl" />
            ) : breed.type === 'dog' ? (
              <FaDog className="text-2xl" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BreedCard = React.memo(BreedCardComponent);
