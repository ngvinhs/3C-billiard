import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { getBidaClubsByID } from "../../lib/action/bidaclubs";
import Button from "../../components/Button";
import moment from "moment";
const BilliardDetail = () => {
  const { id } = useLocalSearchParams("id");
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  const getBidaClubID = async () => {
    try {
      const response = await getBidaClubsByID(id);
      setData(response);
      setImage(response.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBidaClubID();
  }, []);
  console.log(data);
  // console.log(image);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <View className="bg-white h-[100%]">
      <View className="w-[100vw] rounded-md items-center mt-2">
        <Image
          source={{ uri: image }}
          className="w-[90%] h-80 rounded-md items-center"
        />
      </View>
      <View>
        <View className="flex-row justify-between items-center p-2 mx-3">
          <Text className="font-pbold text-base">{data?.bidaName}</Text>
          <Text className="font-pbold text-primary text-base">
            {formatter.format(data?.averagePrice)}/giờ
          </Text>
        </View>
        <View className="mx-5">
          <View className="flex-row items-center pt-1">
            <FontAwesome6
              name="location-dot"
              size={16}
              color="rgb(225 39 39)"
            />
            <Text className="ml-3 text-gray-500 text-sm font-pregular">
              {data?.address
                ? data.address
                : "178, Hoàng Diệu 2, Linh Chiểu, Thủ Đức"}
            </Text>
          </View>
          <View className="flex-row items-center pt-1">
            <AntDesign name="clockcircleo" size={16} color="rgb(225 39 39)" />
            <Text className="ml-2 text-gray-500 text-sm font-pregular">
              Mở cửa từ: {moment(data?.openTime, "HH:mm:ss").format("HH:mm")} -{" "}
              {moment(data?.closeTime, "HH:mm:ss").format("HH:mm")}
            </Text>
          </View>
          <View className="flex-row items-center pt-1">
            <Entypo name="info-with-circle" size={16} color="rgb(225 39 39)" />
            <Text className="ml-2 text-gray-500 text-sm font-pregular">
              Type: phăng, 8 lỗ, 4 bi,...
            </Text>
          </View>
        </View>
        <View className="mx-5 my-2">
          <Text className="font-pbold text-base">Mô tả</Text>
          <View>
            <Text className="text-gray-500 text-sm font-pregular">
              {data?.description
                ? data.description
                : "Câu lạc bộ bida chuyên nghiệp, phục vụ tận tình, giá cả hợp lý, không gian thoáng đãng, sạch sẽ, phù hợp cho mọi lứa tuổi."}
              {/* <Text className="text-primary"> Read More. . .</Text> */}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mx-5 mb-5">
          <Text className="text-base font-pbold">Đánh giá</Text>
          <View className="flex-row items-center">
            <AntDesign name="star" size={20} color="#FFD33C" />
            <Text>4.5</Text>
          </View>
        </View>
        {/* <View className="flex-row justify-around">
          <Image
            source={require("../../assets/detail1.png")}
            className="w-[27%] rounded-md"
          />
          <Image
            source={require("../../assets/detail2.png")}
            className="w-[27%] rounded-md"
          />
          <Image
            source={require("../../assets/detail3.png")}
            className="w-[27%] rounded-md"
          />
        </View> */}
      </View>
      <View className="absolute bottom-4 w-[100%]">
        <View className=" w-[90%] mx-auto">
          <Button
            title="Đặt bàn ngay"
            onSubmit={() => {
              router.navigate({
                pathname: "/booking-clb",
                params: { id },
              });
            }}
          />
        </View>

        {/* <TouchableOpacity
          className="flex-row items-center justify-center bg-primary rounded-xl mx-10 my-2 p-4"
          onPress={() => {
            router.navigate({
              pathname: "/booking-clb",
              params: { id },
            });
          }}
        >
          <Text className="text-white font-psemibold text-base">
            Đặt bàn ngay
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default BilliardDetail;
