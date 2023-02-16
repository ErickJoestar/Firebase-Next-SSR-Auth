import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@/util/firebase';

import { AuthContext } from './AuthContext';

// ********************************************************************************
interface Props {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  // == State =====================================================================
  const [user, setUser] = useState<User | null>(null/*not logged in until first value is emitted*/);
  const [loading, setLoading] = useState(true/*initial value*/);

  // == Effect ====================================================================
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // == Render ====================================================================
  if (loading) return <p>Loading...</p>
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};