import { View, Text } from "react-native";
import React from "react";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

const ConfirmationWaiting = () => {
  const OrderCode = useGlobalSearchParams("orderId");
  console.log(OrderCode);
  return (
    <View>
      <Text>ConfirmationWaiting</Text>
    </View>
  );
};

export default ConfirmationWaiting;
