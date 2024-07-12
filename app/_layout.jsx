import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import GlobalProvider, { useGlobalContext } from "../context/GlobalProvider";
import Toast from "react-native-toast-message";
import CustomUnmatched from "./[...unmatched]";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "PlusJakartaSans-Bold": require("../assets/static/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-BoldItalic": require("../assets/static/PlusJakartaSans-BoldItalic.ttf"),
    "PlusJakartaSans-ExtraBold": require("../assets/static/PlusJakartaSans-ExtraBold.ttf"),
    "PlusJakartaSans-ExtraBoldItalic": require("../assets/static/PlusJakartaSans-ExtraBoldItalic.ttf"),
    "PlusJakartaSans-ExtraLight": require("../assets/static/PlusJakartaSans-ExtraLight.ttf"),
    "PlusJakartaSans-ExtraLightItalic": require("../assets/static/PlusJakartaSans-ExtraLightItalic.ttf"),
    "PlusJakartaSans-Light": require("../assets/static/PlusJakartaSans-Italic.ttf"),
    "PlusJakartaSans-LightItalic": require("../assets/static/PlusJakartaSans-LightItalic.ttf"),
    "PlusJakartaSans-Medium": require("../assets/static/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-MediumItalic": require("../assets/static/PlusJakartaSans-MediumItalic.ttf"),
    "PlusJakartaSans-Regular": require("../assets/static/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/static/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-SemiBoldItalic": require("../assets/static/PlusJakartaSans-SemiBoldItalic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        {/* <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="bida-club"
          options={{
            headerTitle: "Thông tin",
            headerBackTitle: "Quay lại",
          }}
        />
        <Stack.Screen
          name="booking-clb"
          options={{
            headerTitle: "Đặt bàn",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile-detail"
          options={{
            headerTitle: "Hồ sơ",
            headerBackTitle: "Quay lại",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[...unmatched]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <Toast />
    </GlobalProvider>
  );
};

export default RootLayout;
