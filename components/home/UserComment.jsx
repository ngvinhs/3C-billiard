import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import UserAvatar from "../home/UserAvatar";

const UserComment = ({ avatar, name, comment, createdAt }) => {
  return (
    <View className="my-2 ml-2">
      <View className="flex-row">
        <UserAvatar style="w-[15vw]" avatar={avatar} />
        <View>
          <View className={`bg-gray-200 w-[80vw] rounded-xl `}>
            <Text className="font-pbold text-base mx-2 mt-2">{name}</Text>
            <Text className="font-pregular mx-2 mb-2">{comment}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-gray-600 font-pregular ml-1">
              {createdAt} ngày
            </Text>
            <TouchableOpacity>
              <Text className="text-gray-600 font-pregular ml-5">Phản hồi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserComment;
