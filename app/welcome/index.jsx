import {
  Link,
  Redirect,
  SplashScreen,
  router,
  useFocusEffect,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function Welcomeee() {
  const bg = require("../../assets/home.png");

  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  if (!loading && !isLogged) return <Redirect href="/signin" />;

  return (
    <View className="flex-1 items-center justify-center">
      <ImageBackground
        source={bg}
        resizeMode="contain"
        className="w-[100vw] h-[100vh]"
      ></ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}
