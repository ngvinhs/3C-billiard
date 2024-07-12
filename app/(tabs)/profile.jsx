import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../../lib/action/users";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProfileItem from "../../components/profile/ProfileItem";
import { router } from "expo-router";
const Profile = () => {
  const { setUser, setIsLogged, user } = useGlobalContext();

  const post = require("../../assets/profileicon/post.png");
  const ticket = require("../../assets/profileicon/ticket.png");
  const clubregister = require("../../assets/profileicon/clubregister.png");
  const changepass = require("../../assets/profileicon/changepass.png");
  const logouticon = require("../../assets/profileicon/logout.png");

  const handleLogout = async () => {
    await logout();
    setIsLogged(false);
    setUser(null);
  };

  return (
    <SafeAreaView className=" bg-white h-[100%]">
      <View className="m-2">
        <View className="flex-row items-center">
          <View>
            <Image
              className="w-20 h-20 rounded-full"
              source={require("../../assets/Blank-Avatar.png")}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>
          <View>
            <View className="ml-4 w-[65vw]">
              <Text className="font-pbold text-2xl">{user.name}</Text>
              <View className="flex-row items-center mt-4">
                <Feather name="phone" size={20} color="black" />
                <Text className="ml-2 text-base font-pmedium">
                  {user.Phone || "chưa có số điện thoại"}
                </Text>
              </View>
              <View className="flex-row items-center">
                <View>
                  <Ionicons name="mail-outline" size={20} color="black" />
                </View>
                <View>
                  <Text className="ml-2 text-base font-pmedium">
                    {user.email}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="absolute right-0 top-0">
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-4">
          <ProfileItem goTo={"/home"} title={"Bài viết của bạn"} icon={post} />
          <ProfileItem
            title={"Đặt bàn"}
            icon={ticket}
            goTo={"profile-detail/booking"}
          />
          <ProfileItem
            goTo={
              user.role === "Bida Owner"
                ? "profile-detail/club-owned"
                : "profile-detail/club-register"
            }
            title={
              user.role === "Bida Owner"
                ? "Câu lạc bộ"
                : "Đăng kí mở câu lạc bộ"
            }
            icon={clubregister}
          />

          {/* <ProfileItem
            goTo={"/"}
            title={"Thay đổi mật khẩu"}
            icon={changepass}
          /> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
          className="flex-row items-center p-2 py-4"
        >
          <Image className="w-6 h-6 mr-2" source={logouticon} />
          <Text className="text-xl">Đăng xuất</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
        onPress={() => {
          router.push("profile-detail/testscreen");
        }}
        className="flex-row items-center p-2 py-4"
      >
        <Text className="text-xl text-primary">Testpush</Text>
      </TouchableOpacity> */}

        {/* <View>
        <Text>{user ? user.email : "nothing"}</Text>
      </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
