import { Link } from 'react-router-dom';
import { useAuth } from '../features/account/context/useAuth';
import { MoreDetailsForm } from '../features/account/views/MoreDetailsForm';
import { BackgroundDecoration, StepperContextProvider } from '../ui';
import { useDocumentTitle } from 'usehooks-ts';
import { AppRoutes } from '../types/shared';
import { UserMenu } from '../features/student/UserMenu';

export const Dashboard = () => {
  const { user } = useAuth();

  useDocumentTitle(`Dashboard | Mathey - Twój korepetytor matematyki online`);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <BackgroundDecoration />

      {!user ||
        (!user?.detailsComplete && (
          <StepperContextProvider maxStep={2}>
            <MoreDetailsForm />
          </StepperContextProvider>
        ))}

      <div className="container relative z-10 mx-auto p-4">
        <header className="mb-6 flex items-center justify-between">
          <Link
            to={AppRoutes.Dashboard}
            className="flex items-center justify-between"
          >
            <img src="./images/logo.svg" alt="Mathey" width={125} height={95} />

            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
              Korepetycje
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </header>
      </div>
    </div>
  );
};
