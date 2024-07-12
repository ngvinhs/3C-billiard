import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const BookingLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/signin" />;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Đặt bàn",
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="detail-appointment"
        options={{
          headerShown: true,
          headerTitle: "Đặt bàn",
          headerBackButtonMenuEnabled: false,
          headerBackTitle: "Quay lại",
        }}
      />
      <Stack.Screen
        name="confirmation-waiting"
        options={{
          headerShown: true,
          headerTitle: "Xác nhận",
        }}
      />
      <Stack.Screen
        name="user-info"
        options={{
          headerShown: true,
          headerTitle: "Thông tin yêu cầu",
        }}
      />

      <Stack.Screen
        name="momo-payment"
        options={{
          headerShown: true,
          headerTitle: "Thanh toán",
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="success"
        options={{
          headerShown: true,
          headerTitle: "Thành công",
        }}
      />
      <Stack.Screen
        name="clbowner"
        options={{
          headerShown: true,
          headerTitle: "Đặt bàn",
          headerBackButtonMenuEnabled: false,
        }}
      />
    </Stack>
  );
};

export default BookingLayout;
