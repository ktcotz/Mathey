import { useAuth } from '../features/account/context/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Hi Kamil! - {user?.phone}</h1>
    </div>
  );
};
