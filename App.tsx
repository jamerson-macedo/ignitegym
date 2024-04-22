import { StatusBar } from "react-native";
import { Avatar, NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading";
import { THEME } from "./src/theme";

import { Routes } from "@routes/index";
import { AuthContext } from "@contexts/AuthContext";
export default function App() {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <AuthContext.Provider
        value={{
          user: {
            id: "1",
            name: "jamerson",
            email: "jamersonestilizado@gmail.com",
            avatar: "jamerson.png",
          },
        }}
      >
        {fontLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
