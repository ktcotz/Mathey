import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './types';
import {
  FullPageSpinner,
  ProtectedRoute,
  Toaster,
  SwitcherContextProvider,
  DashboardManager,
  StepperContextProvider,
} from './ui';

import { NotFound, Settings, BeTeacher } from './pages';

import { AuthContextProvider } from './features/account';
import { AccountLevelContextProvider } from './features/account/components/Level/context/AccountContext';

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
                  <AccountLevelContextProvider>
                    <DashboardManager />
                  </AccountLevelContextProvider>
                </ProtectedRoute>
              </AuthContextProvider>
            }
          >
            <Route
              path={AppRoutes.DashboardUserSettings}
              element={<Settings />}
            />
          </Route>
          <Route
            path={AppRoutes.CreateTeacher}
            element={
              <AuthContextProvider>
                <StepperContextProvider maxStep={3}>
                  <BeTeacher />
                </StepperContextProvider>
              </AuthContextProvider>
            }
          />
          <Route path={AppRoutes.NotFound} element={<NotFound />} />
        </Routes>
        <Toaster />
      </Suspense>
    </SwitcherContextProvider>
  );
};
