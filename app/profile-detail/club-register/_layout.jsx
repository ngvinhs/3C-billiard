import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ClubRegisterLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Đăng ký Câu lạc bộ",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
};

export default ClubRegisterLayout;
