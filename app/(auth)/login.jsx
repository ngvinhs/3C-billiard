import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const Login = () => {
  return (
    <View className="bg-bgsecondary">
      <ImageBackground
        source={require("../../assets/background.png")}
        resizeMode="contain"
        className="w-[100vw] h-[100vh] "
      >
        <View className="flex-1 items-center">
          <Image
            className="mt-[20%] w-[120px] h-[120px]"
            source={require("../../assets/3C-Icon.png")}
          />
        </View>

        <View className="flex-1 bg-white rounded-3xl">
          <View className="m-8">
            <View>
              <Text className="mt-3 text-4xl font-pbold text-blue-950">
                Welcome to
              </Text>
              <Text className="mt-3 text-4xl font-pbold text-primary">
                3C Billiard
              </Text>
              <Text className="text-gray-500 mt-4">Connect-Cue-Community</Text>
            </View>

            <View className="w-[84vw] pt-[15vh] ">
              <View className="justify-around flex-row rounded-full border-2">
                <TouchableOpacity
                  onPress={() => {
                    router.push("/signin");
                  }}
                  className="bg-primary rounded-full w-[50%] justify-center py-4 px-10"
                >
                  <Text className=" text-center font-psemibold text-white">
                    Sign in
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/signup");
                  }}
                  className="w-[50%] justify-center py-4 px-10 "
                >
                  <Text className="text-center text-primary font-semibold">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
