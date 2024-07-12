import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CLBLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Câu lạc bộ của bạn",
        }}
      />
    </Stack>
  );
};

export default CLBLayout;
