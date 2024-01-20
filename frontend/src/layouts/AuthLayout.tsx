import { auth } from '@/configs/firebaseConfig';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const curUser = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        navigate('/');
      }
    });
    return curUser;
  }, []);

  return <>{children}</>;
};

export default AuthLayout;
