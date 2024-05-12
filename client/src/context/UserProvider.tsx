import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getUser } from "../utils/getUserFromLocalStorage";


// Set interface for note context
export interface UserContextType {
  user: string;
  setLoggedInUser: () => void;
}

// Create notes context
export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

// Provider component
const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string>("");


  const setLoggedInUser = () => {
    const userData=getUser()||"";
    setUser(userData.email)
  };

  useEffect(() => {
    setLoggedInUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
