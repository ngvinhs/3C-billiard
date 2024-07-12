import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const inputRefs = Array(6)
    .fill()
    .map(() => useRef(null));

  const getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem("email");
      setEmail(value);
      if (value !== null) {
        // value previously stored
      }
      return value;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  // Call getEmail in useEffect or wherever you need the email
  useEffect(() => {
    getEmail();
  }, []);

  const handleTextChange = (text, index) => {
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = text;
      return newOtp;
    });

    if (text && inputRefs[index + 1]) {
      inputRefs[index + 1].current.focus();
    }
  };

  //convert this OTP array to a string
  const otpValue = otp.join("");
  console.log(otpValue);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* <SafeAreaView className="m-4 flex-1 h-[100vh]"> */}
        <ScrollView className=" bg-white">
          <View className=" m-2">
            <View className="">
              <Text className="font-psemibold text-3xl text-primary">
                Gần xong rồi
              </Text>
            </View>
            <View className="mt-10">
              <Text className="text-base">
                Nhập 6 số được gửi về mail
                <Text className="text-base font-psemibold"> {email} </Text>
                để xác nhận.
              </Text>
            </View>

            <View className="flex-row w-[70vw] justify-center mt-10 mx-auto">
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  value={value}
                  className="bg-slate-300 w-[15%] mx-2 px-4 py-3 text-center rounded-lg"
                  onChangeText={(text) => handleTextChange(text, index)}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ))}
            </View>
            <View className="justify-center items-center mt-4">
              {/* <TouchableOpacity
                onPress={() => {
                  router.navigate("/change-password");
                }}
                className="mt-10 bg-primary justify-center items-center w-[90vw] py-4 rounded-xl "
              >
                <Text className="font-pbold text-xl text-white">XÁC NHẬN</Text>
              </TouchableOpacity> */}
              <Button
                onSubmit={() => {
                  // set the condition for the OTP
                  if (otpValue.length !== 6) {
                    alert("Vui lòng nhập đủ 6 số");
                    return;
                  }
                  router.navigate({
                    pathname: "/change-password",
                    params: { otp: otpValue },
                  });
                }}
                title="Xác nhận"
              />
            </View>
          </View>

          {/* <View className="justify-center items-center mt-10">
            <Text className="font-pbold">Chưa nhận được code? Gửi lại.</Text>
            <Text className="text-gray-600">Gửi lại sau 00:30</Text>
          </View> */}
        </ScrollView>
        {/* <TouchableOpacity
            onPress={() => {
              router.navigate("/signup");
            }}
            className="absolute bottom-5 bg-black rounded-full justify-center items-center w-[50px] h-[50px]"
          >
            <Entypo name="chevron-left" size={24} color="white" />
          </TouchableOpacity> */}
        {/* </SafeAreaView> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default VerifyEmail;
