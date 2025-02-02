import { ReactNode, useEffect } from 'react';
import { useUser } from '../features/account/queries/useUser';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../types/shared';
import { useAuth } from '../features/account/context/useAuth';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const { setupUser } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(AppRoutes.Home);
    }

    if (!isLoading && user) {
      setupUser(user.id);
    }
  }, [isLoading, isAuthenticated, navigate, setupUser, user]);

  return isAuthenticated && children;
};
