import * as SplashScreen from 'expo-splash-screen';

import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { useAppDispatch, useAppSelector } from "../Store";
import { useCallback, useEffect, useState } from "react";

import { Spinner } from 'native-base';
import { api } from "../app.json";
import { storeAppBook } from "../Store/appbookSlice";
import { storeLanguage } from "../Store/translateSlice";
import { storeSetting } from "../Store/settingSlice";
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");
export default function WelcomeScreen() {
  const { navigate } = useNavigation();

  const [fontsLoaded] = useFonts({
    'PlusJakartaSans': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
  });

  const dispatch = useAppDispatch();

  const translate = useAppSelector((state) => state.translate);

  const [appIsReady, setAppIsReady] = useState({ready: false, error:false});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingResponse = await fetch(api.setting);
        const settingJson = await settingResponse.json();
        const { api_key } = settingJson;
        dispatch({ type: storeSetting.type, payload: settingJson });
        const InventoryResponse = await fetch(api.appBook, {
          headers: {
            api_key,
          },
        });
        const InventoryJson = await InventoryResponse.json();
        dispatch({ type: storeAppBook.type, payload: InventoryJson });
        const LanguageResponse = await fetch(api.language, {
          headers: {
            api_key,
          },
        });
        const { translation: LanguageJson } = await LanguageResponse.json();
        dispatch({ type: storeLanguage.type, payload: LanguageJson });
        setAppIsReady({ready: true, error: false});
      } catch (error) {
        console.error(error);
        setAppIsReady({ready: true, error: true});
      }
    };

    fetchData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady.ready && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady.ready, fontsLoaded]);

  if (!appIsReady.ready || !translate) {
    return <View style={[styles.container,{justifyContent:'center'}]}>
    <Image
      style={styles.background}
      source={require("../assets/images/background.png")}
    />      
    </View>;
  } 

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image
        style={styles.background}
        source={require("../assets/images/background.png")}
      />
      <View style={styles.welcomeContainer}>
        <Image
          style={styles.LogoAppImage}
          source={require("../assets/images/icon.png")}
        />
        <Text style={styles.welcomeText}>{translate.s_welcome}</Text>
        <View style={styles.divider} />
        {!appIsReady.error ? <TouchableOpacity
          onPress={() => navigate("ScanList")}
          style={styles.scanBtn}
        >
          <Text style={styles.scanText}>{translate.s_scan_store_qr_code}</Text>
        </TouchableOpacity>:
          <Text style={styles.scanText}>Server is not responding, please check internet</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#fff",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: "cover",
  },
  welcomeContainer: {
    backgroundColor: "#fff",
    width: width * 0.8,
    marginTop: height * 0.25,
    height: height * 0.45,
    borderRadius: 15,
    alignItems: "center",
  },
  LogoAppImage: {
    resizeMode: "contain",
    width: "90%",
    height: "100%",
    marginTop: "-50%",
    marginBottom: "-10%",
  },
  welcomeText: {
    color: "#000",
    fontSize: 22,
    fontFamily: "PlusJakartaSans"
  },
  divider: {
    height: 1.5,
    width: "80%",
    backgroundColor: "#aaa",
    borderRadius: 15,
    marginTop: 16,
    marginBottom: 28,
  },
  scanBtn: {
    width: "80%",
    backgroundColor: "#D31145",
    textAlign: "center",
    height: 48,
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 28,
  },
  scanText: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 14,
    fontFamily: "PlusJakartaSans"
  },
});
