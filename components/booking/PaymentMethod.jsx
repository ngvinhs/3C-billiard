import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const PaymentMethod = ({
  title,
  description,
  icon,
  check,
  onPaymentMethodChange,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row justify-between items-center p-4 my-1 border-2 border-gray-300 rounded-lg h-20 ${
        check ? "border-primary" : ""
      }`}
      onPress={onPaymentMethodChange}
    >
      <View className="flex-row items-center">
        <View className="items-center w-[10vw]">{icon}</View>
        <View className="w-[80vw]">
          <Text className="font-psemibold">{title}</Text>
          <Text className="text-sm font-pregular">{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentMethod;
