import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { getBidaClubsByID } from "../../lib/action/bidaclubs";

const ClubCard = ({ id }) => {
  const [data, setData] = useState({});

  const [image, setImage] = useState(null);

  const getBidaClubID = async () => {
    try {
      const response = await getBidaClubsByID(id);
      setData(response);
      setImage(response?.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBidaClubID(id);
  }, [id]);

  return (
    <View className="w-[90%] flex-row mt-16 rounded-md border bg-white">
      <Image source={{ uri: image }} className="w-[80px] h-[80px] m-2" />
      <View>
        <Text className="font-pbold text-lg">{data?.bidaName}</Text>
        <View className="flex-row my-2 items-center">
          <FontAwesome6 name="location-dot" size={20} color="#E12727" />
          <Text className="text-sm mx-2 w-[70%]">{data?.address}</Text>
        </View>
        {/* <View className="flex-row mb-2 items-center">
                  <AntDesign name="star" size={20} color="#E12727" />
                  <Text className="text-sm mx-2">5.0 (24)</Text>
                </View> */}
      </View>
    </View>
  );
};

export default ClubCard;
