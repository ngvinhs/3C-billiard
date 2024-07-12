import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ClubEditLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Chỉnh sửa thông tin câu lạc bộ",
        }}
      />
    </Stack>
  );
};

export default ClubEditLayout;
