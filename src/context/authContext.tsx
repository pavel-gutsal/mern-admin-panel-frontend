import React, { createContext, useState } from 'react';
import { User } from '../types/User';

type AuthContextInterface = {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (value: User | null | ((prev: User | null) => User | null)) => void;
};

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      { children }
    </AuthContext.Provider>
  );
};
