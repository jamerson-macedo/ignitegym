import { UserDTO } from "@dtos/UserDTO";
import { Children, ReactNode, createContext } from "react";

export type AuthContextDataProps = {
    user:UserDTO;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);
type AuthContextProviderProps={
    children:ReactNode;

}
export function AuthContextProvider({children} :AuthContextProviderProps){
    return <AuthContext.Provider
    value={{
      user: {
        id: "1",
        name: "jamerson",
        email: "jamersonestilizado@gmail.com",
        avatar: "jamerson.png",
      },
    }}
  >
    {children}
  </AuthContext.Provider>
}