import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const TestLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="test"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Test",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
};

export default TestLayout;
