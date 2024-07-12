import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const DetailLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/signin" />;

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default DetailLayout;
