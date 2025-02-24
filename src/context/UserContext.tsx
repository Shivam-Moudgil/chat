import { createContext, useContext, useEffect, useState } from "react";
import { UserInterface } from "../interfaces/user";
import axios from 'axios';

export interface UserInterfaceContext {
  user: UserInterface | null;
}

const UserContext = createContext<UserInterfaceContext | null>({user:null});

const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};


const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
    setIsLoading(true);
      const response = await axios.get('/api/v1/user');
      console.log(response.data,"Repsonse data from the user provider");
      setUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {isLoading?"Loading Provider Data":children}
    </UserContext.Provider>
  );
};



export { useAuth, UserProvider };