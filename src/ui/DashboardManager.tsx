import { ElementType } from 'react';
import { useAuth } from '../features/account/context/useAuth';
import { Dashboard } from '../pages/Dashboard';
import { DashboardAdmin } from '../pages/DashboardAdmin';
import { FullPageSpinner } from './FullPageSpinner';
import { DashboardTutor } from '../pages/DashboardTutor';

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

  return <DashboardType />;
};
