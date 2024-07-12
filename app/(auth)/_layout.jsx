import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import Loader from "../../components/Loader";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="signin"
          options={{
            headerShown: false,
            headerTitle: "Đăng nhập",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
            headerTitle: "Đăng ký",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: true,
            headerBackTitle: "Quay lại",
            headerTitle: "Quên mật khẩu",
          }}
        />

        <Stack.Screen
          name="verify-email"
          options={{
            headerShown: true,
            headerTitle: "Xác nhận",
            headerBackTitle: "Quay lại",
          }}
        />

        <Stack.Screen
          name="change-password"
          options={{
            headerShown: true,
            headerTitle: "Đổi mật khẩu",
            headerBackTitle: "Quay lại",
          }}
        />
      </Stack>
      <Loader isLoading={loading} />
    </>
  );
};

export default AuthLayout;
