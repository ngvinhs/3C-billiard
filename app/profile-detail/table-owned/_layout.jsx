import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const TableLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Các bàn trong câu lạc bộ",
        }}
      />
      <Stack.Screen
        name="create-table"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Thêm bàn",
          headerBackTitle: "Quay lại",
        }}
      />
      <Stack.Screen
        name="edit-table"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Chỉnh sửa bàn",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
};

export default TableLayout;
