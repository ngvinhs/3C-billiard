import { View, Text, Image } from "react-native";
import React from "react";

const Notifi = ({ data }) => {
  const message = [
    "Người khác đã thích bài viết của bạn",
    "đã gửi yêu cầu đặt bàn vào ngày",
    "đã xác nhận yêu cầu đặt bàn của bạn",
    "đã từ chối yêu cầu đặt bàn của bạn",
  ];

  return (
    <View>
      <View className="flex-row w-[100vw] mx-4 py-2">
        <View className="">
          <Image className="w-16 h-16 rounded-full" source={require("../../../assets/avatar.png")} />
        </View>
        <View className="flex-row items-center w-[75vw] ml-2">
          <Text className="font-psemibold">
            {/* {data.name}{" "} */}
            {data.title}
            {/* dsadsadasdsa */}
            <Text className="font-pregular">
              {data.title === "Bill Activated" &&
                "đã xác nhận yêu cầu đặt bàn của bạn"}
              {data.title === "Bill Rejected" && "đã từ chối yêu cầu đặt bàn của bạn"}
              {data.title === "send" &&
                `đã gửi yêu cầu đặt bàn vào ngày ${data.createAt}`}
            </Text>
            <Text>
              {/* {data.time} */}
              {data.createAt}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notifi;
