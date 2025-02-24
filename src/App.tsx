import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './types/shared';
import { lazy, Suspense } from 'react';
import { FullPageSpinner, ProtectedRoute, Toaster } from './ui';
import { SwitcherContextProvider } from './ui';
import { AuthContextProvider } from './features/account/context/AuthContext';
import { NotFound } from './pages/NotFound';
import { DashboardManager } from './ui/DashboardManager';
import { Settings } from './pages/Dashboard/Settings';

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
          <Route
            path={AppRoutes.Dashboard}
            element={
              <AuthContextProvider>
                <ProtectedRoute>
                  <DashboardManager />
                </ProtectedRoute>
              </AuthContextProvider>
            }
          >
            <Route
              path={AppRoutes.DashboardUserSettings}
              element={<Settings />}
            />
          </Route>
          <Route path={AppRoutes.NotFound} element={<NotFound />} />
        </Routes>
        <Toaster />
      </Suspense>
    </SwitcherContextProvider>
  );
};
