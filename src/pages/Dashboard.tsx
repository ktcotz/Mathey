import { useAuth } from '../features/account/context/useAuth';
import { MoreDetailsForm } from '../features/account/views/MoreDetailsForm';
import { BackgroundDecoration, StepperContextProvider } from '../ui';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <BackgroundDecoration />

      {!user?.detailsComplete && (
        <StepperContextProvider maxStep={2}>
          <MoreDetailsForm />
        </StepperContextProvider>
      )}

      <h1>Hi Kamil! - {user?.phone}</h1>
    </div>
  );
};
