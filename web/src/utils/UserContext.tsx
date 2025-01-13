// Import necessary dependencies from React
import { createContext, useState, ReactNode } from 'react';

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
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

// Create the context with default values
export const UserContext = createContext<UserContextType>({
  userInfo: {},
  setUserInfo: () => {},
});

// Define the props that our Provider component will accept
interface UserContextProviderProps {
  children: ReactNode;
}

// Create the Provider component
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  // Create state to hold user information
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
