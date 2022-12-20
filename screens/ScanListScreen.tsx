import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";

import ListScanCode from "../components/ListScanCode";
import { useTranslate } from "../Store";

const { height, width } = Dimensions.get("window");

export default function ScanListScreen() {

  const translate = useTranslate();
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require("../assets/images/background.png")}
      />
      <View style={styles.listContainer}>
        <Image
          style={styles.LogoAppImage}
          source={require("../assets/images/icon.png")}
        />
        <View style={styles.topHeaderContainer}>
          <TouchableOpacity style={styles.iconBtn}>
            <Image
              style={styles.iconImage}
              source={require("../assets/images/wallet.png")}
            />
          </TouchableOpacity>
          <Text style={styles.selfScanText}>{translate.s_selfscan}</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Image
              style={styles.iconImage}
              source={require("../assets/images/search.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />
        <View style={styles.ListScanContainer}>
            <ListScanCode />
        </View>

      </View>
      <View style={styles.BottomContainer}>
        <TouchableOpacity style={styles.iconBtn}>
            <Image
                style={styles.iconImage}
                source={require("../assets/images/menu.png")}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanImage}>
            <Image
                style={styles.scanImgIcon}
                source={require("../assets/images/scanBtn.png")}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#eee",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: "cover",
    height: height * .4,
  },
  listContainer: {
    backgroundColor: "#fff",
    width: width * 0.9,
    marginTop: height * 0.13,
    height: height * 0.8,
    borderRadius: 15,
    alignItems: "center",
    
  },
  LogoAppImage: {
    resizeMode: "contain",
    width: "30%",
    height: "30%",
    marginTop: "-25%",
    marginBottom: "-29%",
    zIndex: 100,
  },
  selfScanText: {
    color: "#000",
    fontSize: 16,
    marginTop: "15%",
  },
  divider: {
    height: 1.5,
    width: "90%",
    backgroundColor: "#aaa",
    borderRadius: 15,
    marginTop: 2,
    marginBottom: 8,
  },
  topHeaderContainer: {
    flexDirection: "row",
    width: "96%",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  iconBtn: {
    backgroundColor:"#fff",
    textAlign: "center",
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 28,
  },
  iconImage:{
    
  },
  scanText: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 16,
  },
  ListScanContainer: {
    flex: 1, width: '100%', marginBottom: 15
  },
  BottomContainer: {
    marginTop: 10,
    backgroundColor: '#fff0',
    width: "90%",
    flexDirection: 'row',
  },
  scanImage:{
    marginLeft: 10,
    resizeMode: 'contain',
    borderRadius: 10,
    overflow: 'hidden',    
    height: 48,
  },
  scanImgIcon: {
    height: 48,
  }
});
