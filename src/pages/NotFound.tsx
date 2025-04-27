import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackgroundDecoration, Button } from '../ui';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types/shared';
import { useDocumentTitle } from 'usehooks-ts';

export const NotFound = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useDocumentTitle(
    `Nie znaleziono | Mathey - Twój korepetytor matematyki online`,
  );

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-y-hidden bg-gradient-to-br from-blue-100 to-indigo-200 p-4 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundDecoration />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">
          404
        </h1>
        <motion.h2
          className="mb-2 mt-4 text-4xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Ups! Strona nie znaleziona
        </motion.h2>
        <motion.p
          className="mb-8 text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Wygląda na to, że ta strona zniknęła jak trudne zadanie z matematyki!
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button size="lg" className="font-semibold" asChild>
          <Link to={AppRoutes.Home}>Wróć do strony głównej</Link>
        </Button>
      </motion.div>
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <svg
          className="h-64 w-64"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Nie znaleziono strony"
        >
          <motion.path
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 70 80 L 100 110 L 130 80 M 100 110 L 100 140"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="20"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
