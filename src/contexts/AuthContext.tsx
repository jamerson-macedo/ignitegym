import { UserDTO } from "@dtos/UserDTO";
import { Children, ReactNode, createContext, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn:(email:string,password:string)=>void;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);
type AuthContextProviderProps = {
  children: ReactNode;
 
};
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: "1",
    name: "jamerson",
    email: "jamersonestilizado@gmail.com",
    avatar: "jamerson.png",
  });

  function signIn(email:string,password:string){
    setUser({ id: "", name: "", email, avatar: "" });
  }
  return (
    <AuthContext.Provider value={{user,signIn}}>
      {children}
    </AuthContext.Provider>
  );
}
