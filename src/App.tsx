import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './types/shared';
import { lazy, Suspense } from 'react';
import { FullPageSpinner } from './ui';
import { SwitcherContextProvider } from './ui';
import { Dashboard } from './pages/Dashboard';

const Home = lazy(async () => {
  const { Home } = await import('./pages/Home');
  return { default: Home };
});

export const App = () => {
  return (
    <SwitcherContextProvider>
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route path={AppRoutes.Home} element={<Home />} />
          <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
        </Routes>
      </Suspense>
    </SwitcherContextProvider>
  );
};
