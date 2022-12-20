import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import { NativeBaseProvider } from "native-base";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { store } from "./Store";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
