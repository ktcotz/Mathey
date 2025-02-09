import { useAuth } from '../features/account/context/useAuth';
import { MoreDetailsForm } from '../features/account/views/MoreDetailsForm';
import { BackgroundDecoration, StepperContextProvider } from '../ui';
import { useDocumentTitle } from 'usehooks-ts';

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

      <h1>Hi Kamil! - {user?.phone}</h1>
      <p>
        Mieszkasz w {user?.city} - {user?.street} {user?.house_number}
      </p>
    </div>
  );
};
