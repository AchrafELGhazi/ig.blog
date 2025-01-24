// Import necessary dependencies from React
import { createContext, useState, ReactNode } from 'react';
import type { User } from './types';


// Define the structure of our user data
interface UserInfo {
  username?: string;
  email?: string;
  bio?: string;
  preferences?: string[];
  img?: string;
  id?: string;
}

// Define the structure of our context data
interface UserContextType {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context with default values
export const UserContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

// Define the props that our Provider component will accept
interface UserContextProviderProps {
  children: ReactNode;
}

// Create the Provider component
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  // Create state to hold user information
  const [userInfo, setUserInfo] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};