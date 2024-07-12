import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ClubStatisticLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Thống kê câu lạc bộ",
        }}
      />
    </Stack>
  );
};

export default ClubStatisticLayout;
