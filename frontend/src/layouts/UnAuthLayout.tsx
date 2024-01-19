import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const UnAuthLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (user) return <Navigate to={'/'} replace={true} />;

  return <>{children}</>;
};

export default UnAuthLayout;
