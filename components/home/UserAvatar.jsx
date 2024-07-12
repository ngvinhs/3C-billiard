import { View, Text, Image } from "react-native";
import React from "react";

const UserAvatar = ({ avatar, style }) => {
  return (
    <View className={style}>
      <Image
        source={avatar}
        className="w-[50px] h-[50px] rounded-full bg-black-200"
      />
    </View>
  );
};

export default UserAvatar;
