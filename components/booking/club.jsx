import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const Club = ({ data, style }) => {
  const image = { uri: data.image };
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <TouchableOpacity
      className={`flex-row p-2 bg-gray-50 my-1 mx-3 ${style} rounded-lg`}
      onPress={() =>
        router.navigate({
          pathname: "/bida-club/[id]",
          params: { id: data?.id },
        })
      }
    >
      <View className="">
        <Image className="w-[35vw] h-[35vw]" source={image} />
      </View>
      <View className="ml-2 w-[50vw]">
        <Text className="text-base font-psemibold pt-2">{data?.bidaName}</Text>
        <Text className="text-sm text-primary font-pbold pt-2">
          {data.averagePrice > 0
            ? formatter.format(data?.averagePrice)
            : "Liên hệ"}
        </Text>
        <Text className="text-sm font-pregular text-gray-500 pt-2">
          {data?.address}
        </Text>
        <View className="flex-row justify-between items-center pt-2">
          <View className="flex-row items-center">
            <Text className="font-pregular">Mở cửa:</Text>
            <Text className="font-pbold ml-1">
              {data.openTime
                ? data.openTime.split(":").slice(0, 2).join(":")
                : "4.5"}
              {data.closeTime
                ? ` - ${data.closeTime.split(":").slice(0, 2).join(":")}`
                : " - 23:00"}
            </Text>
          </View>
          {/* <View>
            <Text></Text>
            <Text className="font-pregular text-gray-500">
              {data.distance ? data.distance : "3.3km"}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Club;
