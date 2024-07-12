import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import moment from "moment";

const NotiCard = ({ data }) => {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based

    return `${hours}:${minutes} ${day}-${month}`;
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based

    return `${day}-${month}`;
  };
  const message = [
    "Người khác đã thích bài viết của bạn",
    "đã gửi yêu cầu đặt bàn vào ngày",
    "đã xác nhận yêu cầu đặt bàn của bạn",
    "đã từ chối yêu cầu đặt bàn của bạn",
  ];

  return (
    <TouchableOpacity
      className="flex-row w-[100vw] mx-4 py-2"
      onPress={() => {
        if (data.title === "Thông báo đặt bàn mới") {
          router.navigate({
            pathname: "/profile-detail/club-owned",
            params: { id: data?.id },
          });
          return;
        } else {
          router.push({
            pathname: "/profile-detail/booking/bill-detail",
            params: { orderCode: data?.billOrderCode },
          });
        }
      }}
    >
      <View className="">
        <Image
          className="w-16 h-16 rounded-full"
          source={require("../../assets/3C-Icon.png")}
        />

        <Image
          className="w-5 h-5 absolute top-12 right-0"
          source={
            data.title === "Thông báo đặt bàn thành công"
              ? require("../../assets/success.png")
              : data.title === "Thông báo đặt bàn mới"
              ? require("../../assets/order.png")
              : data.title === "Thông báo từ chối đặt bàn"
              ? require("../../assets/reject.png")
              : require("../../assets/3C-Icon.png")
          }
        />
      </View>
      <View className="flex-col items-start w-[75vw] ml-2">
        <Text className="font-pmedium">{data.descrpition}</Text>
        <Text className="font-mono">
          {/* {formatDateTime(data.createAt)} */}
          {/* {new Date(data.createAt).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })} */}
          {moment(data.createAt).format("HH:mm") +
            " " +
            moment(data.createAt).format("DD/MM")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotiCard;
