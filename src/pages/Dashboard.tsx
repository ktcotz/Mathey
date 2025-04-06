import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../features/account/context/useAuth';
import { MoreDetailsForm } from '../features/account/views/MoreDetailsForm';
import { BackgroundDecoration, StepperContextProvider } from '../ui';
import { useDocumentTitle } from 'usehooks-ts';
import { AppRoutes } from '../types/shared';
import { UserMenu } from '../features/student/UserMenu/UserMenu';
import { useTheme } from '../store/theme/useTheme';
import Fireworks from '@fireworks-js/react';
import { useAccountLevel } from '../features/account/components/Level/context/useAccountLevel';

export const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { isLevelingUp } = useAccountLevel();

  useDocumentTitle(`Dashboard | Mathey - Twój korepetytor matematyki online`);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundDecoration />
      {!user ||
        (!user?.detailsComplete && (
          <StepperContextProvider maxStep={2}>
            <MoreDetailsForm />
          </StepperContextProvider>
        ))}

      <div className="container relative z-10 mx-auto min-h-screen">
        <header className="mb-6 flex items-center justify-between">
          <Link
            to={AppRoutes.Dashboard}
            className="flex items-center justify-between"
          >
            <img
              src={`/images/${theme === 'dark' ? 'logo-white' : 'logo'}.svg`}
              alt="Mathey"
              width={125}
              height={95}
            />

            <span className="hidden bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent sm:block">
              Korepetycje
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {isLevelingUp && (
          <div className="pointer-events-none absolute inset-0 z-50">
            <Fireworks
              options={{
                acceleration: 1.05,
                friction: 0.95,
                gravity: 1.5,
                particles: 50,
                intensity: 30,
                traceLength: 3,
                traceSpeed: 3,
                explosion: 5,
                autoresize: true,

                delay: { min: 15, max: 30 },
              }}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 50,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
