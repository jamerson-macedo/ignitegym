import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";

import { useAuth } from "@hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";
// usando tema na navegação
export function Routes() {
  const { colors } = useTheme();

  const { user } = useAuth();
  const isLoadingStorageData=useAuth()
  console.log("usuario logado=>", user);
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  if(isLoadingStorageData.isLoadingUserStorageData){
    return <Loading/>
   
  }
  return (
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
