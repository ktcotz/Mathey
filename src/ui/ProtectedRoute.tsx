import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../types';
import { useAuth, useUser } from '../features/account';

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
