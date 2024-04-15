import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Exercise } from "@screens/Exercise";

import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { useTheme } from "native-base";
import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";

type AppRoutes = {
  Exercise: undefined;
  History: undefined;
  Home: undefined;
  Profile: undefined;
};

export type AppNavigationProps = BottomTabNavigationProp<AppRoutes>;

const { Screen, Navigator } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
    const {sizes}=useTheme();
    const iconSize = sizes[6]
  return (
    <Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: ({color}) => <HomeSvg  fill={color} width={iconSize} height={iconSize}/> }}
      />
      <Screen name="History" component={History} options={{ tabBarIcon: ({color}) => <HistorySvg  fill={color} width={iconSize} height={iconSize}/> }}/>
      <Screen name="Profile" component={Profile} options={{ tabBarIcon: ({color}) => <ProfileSvg  fill={color} width={iconSize} height={iconSize}/> }} />
      <Screen name="Exercise" component={Exercise} />
    </Navigator>
  );
}
