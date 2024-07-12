import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const TabsBooking = ({ activeBooking, history, onChange }) => {
  return (
    <View className="flex-row w-[80vw] items-center mx-auto justify-between bg-gray-100 rounded-full py-1 pr-1">
      <TouchableOpacity
        onPress={onChange}
        className={`${
          activeBooking && "bg-white rounded-full py-3 ml-1"
        } py-3 rounded-full w-[50%] text-center`}
      >
        <Text
          className={`${
            activeBooking && "rounded-full font-psemibold text-center"
          } ${!activeBooking && "font-pregular text-center"} `}
        >
          Đang đặt
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onChange}
        className={`${
          history && "bg-white rounded-full py-3 mr-1"
        } py-3 rounded-full w-[50%] text-center`}
      >
        <Text
          className={`${history && "rounded-full font-psemibold text-center"} ${
            !history && "font-pregular text-center"
          } `}
        >
          Lịch sử
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabsBooking;
