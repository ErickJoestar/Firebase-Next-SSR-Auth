import { User } from 'firebase/auth';
import { createContext } from 'react';

// ********************************************************************************
export type AuthContextType = {
  user: User | null/*not logged in*/
};
export const AuthContext = createContext<AuthContextType | undefined/*not loaded yet*/>(undefined/*initially not loaded*/);