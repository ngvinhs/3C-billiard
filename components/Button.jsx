import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

const Button = ({ title, onSubmit, style, icon, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onSubmit}
      className="py-4 bg-primary rounded-3xl border border-primary w-full"
    >
      <View className="flex-row justify-center w-full">
        <Text className="text-white text-base font-psemibold text-center">
          {title}
        </Text>
        <Text> </Text>
        <View>{icon}</View>
        {isLoading && (
          <>
            <Text> </Text>
            <ActivityIndicator size="small" color="#fff" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
