import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const ProfileItem = ({ title, icon, goTo }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate(goTo);
      }}
      className="flex-row items-center justify-between p-2 py-4 border-b border-gray-400"
    >
      <View className="flex-row items-center">
        <Image className="w-6 h-6 mr-2" source={icon} />
        <Text className="font-pmedium text-xl">{title}</Text>
      </View>

      <Feather name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ProfileItem;
