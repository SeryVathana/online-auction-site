import { auth } from '@/configs/firebaseConfig';
import { signOut } from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { AuthContextType, UserDBType } from '@/lib/types';
import axios from 'axios';

const defaultValue: AuthContextType = {
  user: null,
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDBType | null>(null);

  useEffect(() => {
    const curUser = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        axios.get(`http://localhost:3000/user/${authUser.uid}`).then((res) => {
          console.log(res.data);
          setUser(res.data);
        });
      } else {
        setUser(null);
      }
    });
    return curUser;
  }, []);

  const logout = () => {
    setUser(null);
    return signOut(auth);
  };

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
};
