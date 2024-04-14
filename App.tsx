
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider,Box } from 'native-base';
import { useFonts,Roboto_400Regular,Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import {THEME} from './src/theme'
export default function App() {
  const [fontLoaded]=useFonts({Roboto_400Regular,Roboto_700Bold});
  return (
    <NativeBaseProvider theme={THEME}>
    <StatusBar barStyle={'light-content'} backgroundColor={"transparent"} translucent/>
     {fontLoaded? <View/>: <Loading/>}
    </NativeBaseProvider>
  );
}


