import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { getWaitingBills } from "../../lib/action/bill";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const CardCLB = ({ data, isRefreshing }) => {
  const [waitingStatus, setWaitingStatus] = useState([]);
  const getWatingStatus = async () => {
    try {
      const response = await getWaitingBills(data?.id);
      console.log(response);
      if (response.length > 0) {
        setWaitingStatus(response.length);
      } else {
        setWaitingStatus([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWatingStatus();
  }, [isRefreshing]);

  if (waitingStatus.length > 0) {
    console.log(waitingStatus);
  }

  return (
    <View
      className={`h-[20vh] my-2 border rounded-md ${
        data?.status === "WAITING" && "border-orange-500"
      } ${data?.status === "DELETED" && "border-primary"} ${
        data?.status === "ACTIVE" && "border-green-600"
      }  `}
    >
      <View className="mx-2">
        <View className="flex-row justify-between">
          <View className="w-[70%]">
            <Text className="font-pbold text-lg">
              {data?.bidaName || "name"}
            </Text>
            <Text className="font-pmedium">{data?.address || "Address"}</Text>
          </View>
          {data?.status === "ACTIVE" && (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/profile-detail/confirm",
                  params: { clubId: data?.id },
                });
              }}
              className="mt-2 mr-2 flex-row"
            >
              <Text className="font-pmedium">
                {waitingStatus > 0 ? "Yêu cầu mới" : "Các yêu cầu"}{" "}
              </Text>
              {waitingStatus > 0 && (
                <View className="bg-primary w-4 h-4 rounded-full ml-1">
                  <Text className="text-white text-xs text-center">
                    {waitingStatus}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-row items-center justify-between mx-4 mt-10 ">
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/profile-detail/club-edit",
                params: { clubId: data?.id },
              });
            }}
            className="items-center"
          >
            <Feather name="edit" size={24} color="black" />
            <Text>Chỉnh sửa</Text>
          </TouchableOpacity>
          {data?.status === "ACTIVE" && (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/booking-clb/clbowner",
                  params: { id: data?.id },
                });
              }}
              className="items-center"
            >
              <Image
                className="w-6 h-6"
                source={require("../../assets/table-edit.png")}
              />
              <Text>Quản lí bàn</Text>
            </TouchableOpacity>
          )}

          {data?.status === "ACTIVE" && (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/profile-detail/table-owned",
                  params: { clubId: data?.id },
                });
              }}
              className="items-center"
            >
              <Image
                className="w-6 h-6"
                source={require("../../assets/table-create.png")}
              />
              <Text>Tạo bàn bida</Text>
            </TouchableOpacity>
          )}
          {data?.status === "ACTIVE" && (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/profile-detail/club-statistic",
                  params: { clubId: data?.id },
                });
              }}
              className="items-center"
            >
              <MaterialIcons name="history" size={26} color="black" />
              <Text>Thống kê</Text>
            </TouchableOpacity>
          )}

          {data?.status === "DELETED" && (
            <View className="bg-primary px-4 w-32 py-2 rounded-lg">
              <Text className="text-white font-pbold text-center">
                Bị từ chối
              </Text>
            </View>
          )}
          {data?.status === "WAITING" && (
            <View className="bg-orange-500 px-4 w-32 py-2 rounded-lg">
              <Text className="text-white font-pbold">Chờ xác nhận</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardCLB;
