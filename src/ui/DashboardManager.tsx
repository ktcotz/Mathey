import { ElementType } from 'react';
import { useAuth } from '../features/account';
import { Dashboard, DashboardAdmin, DashboardTutor } from '../pages';
import { FullPageSpinner } from './FullPageSpinner';
import { AvatarContextProvider } from '../features/shared/Avatar/context/AvatarContext';

export const DashboardManager = () => {
  const { user } = useAuth();

  if (!user) return <FullPageSpinner />;

  const { type } = user;

  const manager: Record<typeof type, ElementType> = {
    public: Dashboard,
    admin: DashboardAdmin,
    teacher: DashboardTutor,
  };

  const DashboardType = manager[type];

  return (
    <AvatarContextProvider>
      <DashboardType />
    </AvatarContextProvider>
  );
};
