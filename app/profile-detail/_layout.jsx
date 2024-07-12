import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const ProfileLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/signin" />;

  return (
    <Stack>
      <Stack.Screen
        name="club-register"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Hồ sơ",
          headerBackTitle: "Quay lại",
        }}
      />

      <Stack.Screen
        name="club-owned"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Câu lạc bộ của bạn",
        }}
      />
      <Stack.Screen
        name="table-owned"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Các bàn trong câu lạc bộ",
        }}
      />
      <Stack.Screen
        name="booking"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
          headerTitle: "Đặt bàn",
        }}
      />
      <Stack.Screen
        name="confirm"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Yêu cầu đặt bàn",
        }}
      />
      <Stack.Screen
        name="testscreen"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Test",
        }}
      />
      <Stack.Screen
        name="club-edit"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Chỉnh sửa thông tin câu lạc bộ",
        }}
      />

      <Stack.Screen
        name="club-statistic"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerTitle: "Thống kê câu lạc bộ",
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
