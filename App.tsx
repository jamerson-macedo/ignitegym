
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider,Box } from 'native-base';
import { useFonts,Roboto_400Regular,Roboto_700Bold } from '@expo-google-fonts/roboto';
export default function App() {
  const [fontLoaded]=useFonts({Roboto_400Regular,Roboto_700Bold});
  return (
    <NativeBaseProvider>
    <StatusBar barStyle={'light-content'} backgroundColor={"transparent"} translucent/>
      {fontLoaded?<View/>:<View/>}
    </NativeBaseProvider>
  );
}


