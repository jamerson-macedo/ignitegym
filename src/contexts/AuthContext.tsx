import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { Children, ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingStorageData: boolean;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);
type AuthContextProviderProps = {
  children: ReactNode;
};
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingStorageData,setIsLoadingStorageData] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw  error;
    }
  }
  async function loadUserData(){
    try {
      const userLogged= await storageUserGet();
      if(userLogged){
        setUser(userLogged);
        setIsLoadingStorageData(false);
      }
      
    } catch (error) {
      throw error;
      
    }finally{
      setIsLoadingStorageData(false);
    }
   
  }
  useEffect(()=>{loadUserData();},[])
  return (
    <AuthContext.Provider value={{ user, signIn,isLoadingStorageData }}>
      {children}
    </AuthContext.Provider>
  );
}
