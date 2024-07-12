import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ConfirmBookingLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Xác nhận đặt bàn",
          title: "ConfirmBooking",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default ConfirmBookingLayout;
