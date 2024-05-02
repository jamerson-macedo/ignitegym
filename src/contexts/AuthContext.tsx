import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { Children, ReactNode, createContext, useEffect, useState } from "react";
import { err } from "react-native-svg";
// dados que serão expostos para todo o app
export type AuthContextDataProps = {
  user: UserDTO;
  updateUserProfile: (userUpadated: UserDTO) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingStorageData: boolean;
  signOut: () => Promise<void>;
};
// criando o contexto para usar em todo app
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO); // apos atuaqlizar os dados esses dados tem que ser atualizados
  const [isLoadingStorageData, setIsLoadingStorageData] = useState(true);
  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userData);
  }
  async function storageUserAndTokenSave(userData: UserDTO, token: string,refresh_token: string) {
    try {
      setIsLoadingStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({token,refresh_token});
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }
  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token,data.refresh_token);

        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }
  async function loadUserData() {
    try {
      setIsLoadingStorageData(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();
      if (userLogged && token) {
        userAndTokenUpdate(userLogged, token.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }
  async function signOut() {
    try {
      setIsLoadingStorageData(true);

      setUser({} as UserDTO);

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }
  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated); // atualizando o usuario
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    } finally {
    }
  }
  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe=api.registerInterceptTokenManager(signOut)
    return ()=>{
      subscribe()
    }
  },[signOut])
  return (
    <AuthContext.Provider
      value={{ user, signIn, isLoadingStorageData, signOut,updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
