import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

const BookingLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Đặt bàn",
        }}
      />
      <Stack.Screen
        name="bill-detail"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Chi tiết hóa đơn",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
};

export default BookingLayout;
