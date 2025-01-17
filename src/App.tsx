import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './types/shared';
import { lazy, Suspense } from 'react';
import { FullPageSpinner } from './ui';

const Home = lazy(async () => {
  const { Home } = await import('./pages/Home');
  return { default: Home };
});

export const App = () => {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route path={AppRoutes.Home} element={<Home />} />
      </Routes>
    </Suspense>
  );
};
