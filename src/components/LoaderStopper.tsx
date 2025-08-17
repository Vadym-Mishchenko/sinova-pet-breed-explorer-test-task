'use client';
import { useEffect } from 'react';
import { useLoader } from '@/components/LoaderContext';

const LoaderStopper = () => {
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return null;
};

export default LoaderStopper;
