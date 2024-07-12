import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import UserPost from "../../components/home/UserPost";
import UserAvatar from "../../components/home/UserAvatar";
import UserComment from "../../components/home/UserComment";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const logo = require("../../assets/3C-Icon.png");
  // const searchIcon = require("../../assets/search-normal.png");

  const avatar = require("../../assets/3C-Icon.png");

  const { user } = useGlobalContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView className="mt-10 h-[100vh] top-[50%]">
        <View className=" justify-center items-center">
          <Text className="font-pbold">
            Bài đăng hiện đang trong quá trình phát triển
          </Text>
          <Text className="font-pregular">
            Bạn đã có thể đặt bàn ở tab{" "}
            <Text className="text-primary font-pbold"> đặt bàn</Text>
          </Text>
        </View>
        {/* <View className="">
          <View className="m-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image source={logo} className="w-[50px] h-[50px] rounded-full" />
              <Text className="text-2xl font-pbold text-primary">
                3C Billiard
              </Text>
            </View>
            <View>
              <Feather name="search" size={24} color="black" />
            </View>
          </View>
          <View className="border-y border-slate-400">
            <View className="flex-row my-2 m-2">
              <UserAvatar avatar={avatar} />
              <View className="w-3/4 mx-auto">
                <View className="rounded-xl border p-2 border-slate-700 my-auto ">
                  <TextInput
                    className="items-center font-pmedium"
                    placeholder="Bạn đang nghĩ gì?"
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="border-b-4 border-gray-400">
            <UserPost
              name="Nguyễn Văn A"
              time="16 phút trước"
              content="Set kèo chơi bida ở làng đại học nè mọi người. Ai tham gia không?"
              like="19"
              comment="23"
              avatar={avatar}
            />
            <View className="h-1 border-t mt-2 border-gray-300"></View>
            <UserComment
              avatar={avatar}
              name="Chí Trung"
              comment="Xin thông tin liên hệ đi bạn ơi"
              createdAt="1"
            />
            <UserComment
              avatar={avatar}
              name="Trần Đức"
              comment="Mình cũng muốn tham gia"
              createdAt="1"
            />
            <View className="p-2 flex-row items-center border-t border-gray-300">
              <UserAvatar style="w-[15vw]" avatar={avatar} />
              <View className="bg-gray-200 rounded-xl w-[80vw] p-3">
                <TextInput placeholder="Viết bình luận" />
              </View>
            </View>
          </View>
          <View className="border-b-4 border-gray-400">
            <UserPost
              name="Nguyễn Quang Vinh"
              time="1 giờ trước"
              content="Set kèo chơi bida ở làng đại học nè mọi người. Ai tham gia không?"
              like="19"
              comment="23"
              avatar={avatar}
            />
            <UserComment
              avatar={avatar}
              name="Chí Trung"
              comment="Xin thông tin liên hệ đi bạn ơi"
              createdAt="1"
            />
            <UserComment
              avatar={avatar}
              name="Trần Đức"
              comment="Mình cũng muốn tham gia"
              createdAt="1"
            />
            <View className="p-2 flex-row items-center border-t border-gray-300">
              <UserAvatar style="w-[15vw]" avatar={avatar} />
              <View className="bg-gray-200 rounded-xl w-[80vw] p-3">
                <TextInput placeholder="Viết bình luận" />
              </View>
            </View>
          </View>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
