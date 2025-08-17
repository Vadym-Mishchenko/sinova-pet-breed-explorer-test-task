'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLoader } from './LoaderContext';
import Loader from './Loader';

const NavigationLoader = () => {
  const { loading } = useLoader();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-white/80 flex items-center justify-center z-[9999]"
        >
          <Loader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationLoader;
