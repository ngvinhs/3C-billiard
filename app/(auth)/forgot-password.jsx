import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { forgotPassword } from "../../lib/action/auth";
import Toast from "react-native-toast-message";

const ForgotPassword = () => {
  const mailIcon = require("../../assets/mail.png");

  const [mail, setMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (mail === "") {
      Alert.alert("Vui lòng nhập email");
      return false;
    }
    if (!emailRegex.test(mail)) {
      Alert.alert("Email không hợp lệ");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    // try{
    // }catch( ) {
    // }
    if (validate()) {
      setIsLoading(true);
      try {
        await AsyncStorage.setItem("email", mail);
        const formData = new FormData();
        formData.append("email", mail);

        const response = await forgotPassword(mail);
        console.log(response);
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Thành công",
            text2: "Mã OTP đã được gửi về email của bạn",
          });
          router.push("/verify-email");
        } else {
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Có lỗi xảy ra, vui lòng thử lại sau",
          });
        }

        // router.push("/verify-email");
      } catch (e) {
        console.log(e);
        if (e.response.status === 500) {
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Có lỗi xảy ra, vui lòng thử lại sau",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View className="h-[100vh] bg-white">
      <View className="m-2">
        <Text className="font-pmedium text-center text-base">
          Nhập email của bạn để nhận mã OTP về email
        </Text>
        <TextField
          fieldName="Email"
          placeholder="username@example.com"
          handleChangeText={(e) => {
            setMail(e);
          }}
          value={mail}
          icon={mailIcon}
        />
        <View className="mt-5">
          <Button
            title="Xác nhận"
            onSubmit={() => {
              onSubmit();
            }}
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
