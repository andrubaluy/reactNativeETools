import { useFonts } from 'expo-font';
import Navigator from "./src/navigation/Navigator"
import { Platform, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { colors } from './src/constants/colors';
import { Provider } from 'react-redux';
import store from "./src/store"

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Callingstone: require("./assets/Callingstone.ttf")
  })

  if (!fontsLoaded || fontError) {
    return null;
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.color200
  },
});


