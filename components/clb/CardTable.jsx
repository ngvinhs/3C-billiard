import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { deleteTableBida } from "../../lib/action/bidaTable";
import { router } from "expo-router";
const CardTable = ({ data, deleteTable, bidaClubId }) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <View className="w-full">
      <View className="flex-row  mx-5 my-2 rounded-lg border p-2">
        <View>
          <Image
            className="w-20 h-20 rounded-full"
            source={{ uri: data?.image }}
          />
        </View>
        <View className="ml-2">
          <View className="flex-row justify-between w-[60vw]">
            <Text className="text-base font-pmedium">
              Tên bàn:{data?.tableName}
            </Text>
            <Text className="text-base font-pregular">Loại: {data?.note}</Text>
          </View>
          <View className="mt-1">
            <Text className="text-sm font-pmedium">
              Giá: {formatter.format(data?.price)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/profile-detail/table-owned/edit-table",
                  params: { tableId: data?.id, clubId: bidaClubId },
                });
              }}
              className="flex-row items-center"
            >
              <Feather name="edit" size={24} color="#57e127" />
              <Text className="font-pregular text-base ml-2">Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteTable}
              className="flex-row items-center"
            >
              <AntDesign name="closecircleo" size={24} color="#e12727" />
              <Text className="font-pregular text-base ml-2">Xoá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardTable;
