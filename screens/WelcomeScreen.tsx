import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');
export default function WelcomeScreen() {
    const { navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require('../assets/images/background.png')}
      />
      <View style={styles.welcomeContainer}>
        <Image
            style={styles.LogoAppImage}
            source={require('../assets/images/icon.png')}
        />
        <Text style={styles.welcomeText}>
            Welcome!
        </Text>
        <View style={styles.divider} />
        <TouchableOpacity onPress={() => navigate('ScanList')} style={styles.scanBtn}>
            <Text style={styles.scanText}>
                Scan Store QR code    
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#fff",
    
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'cover'
  },
  welcomeContainer: {
    backgroundColor: '#fff',
    width: width * 0.8,
    marginTop: height * 0.25,
    height: height * 0.45,
    borderRadius: 15,
    alignItems: 'center',
  },
  LogoAppImage: {
    resizeMode: 'contain',
    width: '90%',
    height: '100%',
    marginTop: '-50%',
    marginBottom: '-10%',
  },
  welcomeText: {
    color: "#000",
    fontSize: 28
  },
  divider: {
     height: 1.5, width: '80%', backgroundColor: '#aaa',
     borderRadius: 15,
     marginTop: 16,
    marginBottom: 28,
  },
  scanBtn:{
    width: '80%',
    backgroundColor: "#D31145",
    textAlign: "center",
    height: 48,
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 28,
  },
  scanText: {
    color: '#fff',
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 16,
  }
});
