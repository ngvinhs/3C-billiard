import { View, Text } from "react-native";
import React from "react";

const Totalbooking = ({ data }) => {
  // data.slot split
  // const slotItem = data.slot.split(",");

  // make the time with the slotItem, assuming 1 slotItem is equal to 1 hour
  // const totalHours = slotItem.length;
  // const totalTime = `${totalHours} giờ`;
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <View className="mx-4 mt-2">
      <View className="flex-row justify-between">
        <Text className="font-pregular text-lg">{data.tableName}</Text>
        <Text className="font-pregular text-lg">
          {formatter.format(data.price)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mt-2">
        <View className="flex-row w-[70%] flex-wrap">
          {data?.slotStartTimes.map((slot, index) => (
            <View
              key={index}
              className="border mr-2 p-1 items-center rounded-lg mb-1 w-14"
            >
              <Text className="font-pregular">
                {new Date(`1970-01-01T${slot}Z`).toISOString().substr(11, 5)}
              </Text>
            </View>
          ))}
        </View>

        <Text className="w-[50%]] items-center font-pmedium text-sm text-gray-500">
          {data?.slotStartTimes.length} giờ
        </Text>
      </View>
    </View>
  );
};

export default Totalbooking;
