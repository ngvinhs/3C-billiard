import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const WelcomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default WelcomeLayout;
