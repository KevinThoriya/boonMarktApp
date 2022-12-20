import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslate } from "../Store";

const SlideMenu = ({ navigation }: DrawerContentComponentProps) => {
  const translate = useTranslate();

  const whiteNavigation = [
    {
      icon: "Scans",
      label: translate.a_cv_scan_items,
      onPress: () => navigation.navigate("Scans"),
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{  position:'relative', overflow: 'hidden' }}>
          <Image
            style={styles.background}
            source={require("../assets/images/icon.png")}
          />
        </View>
      </SafeAreaView>

      <View style={styles.itemContainer}>
        <View style={{}}>
          {whiteNavigation.map((props, key) => {
            const itemMarginTop = key > 0 ? 24 : 0;

            return (
              <TouchableOpacity key={props.label} onPress={props.onPress}>
                <Text style={styles.Label}>{props.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};
export default SlideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#fff",
  },
  background: {
    
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  itemContainer: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    width: '100%',
    marginVertical: 4,
  },
  Label:{
    fontSize: 18,
    paddingVertical: 8,
    
  }
});
