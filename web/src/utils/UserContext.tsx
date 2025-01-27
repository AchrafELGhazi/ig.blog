import { createContext, useState, ReactNode } from 'react';
import { User } from './types';

interface UserContextType {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
