import {
  View,
  Text,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { changePassword } from "../../lib/action/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const ChangePassword = () => {
  // const onSubmit = async () => {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  const otpparams = useLocalSearchParams("otp");
  const otp = otpparams.otp;

  const validate = () => {
    if (form.password === "") {
      Alert.alert("Vui lòng nhập mật khẩu mới");
      return false;
    }
    if (form.confirmPassword === "") {
      Alert.alert("Vui lòng xác nhận mật khẩu mới");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert("Mật khẩu không khớp");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (validate()) {
      try {
        const value = await AsyncStorage.getItem("email");
        // const formData = new FormData();
        // formData.append("email", value);
        // formData.append("otp", otp);
        // formData.append("password", form.password);
        // console.log("formdata", formData);
        const response = await changePassword(value, otp, form.password);
        console.log("response", response);
        if (response.message === "OTP is valid. Password has been changed.") {
          router.navigate("/signin");
          Toast.show({
            type: "success",
            text1: "Đổi mật khẩu thành công",
            visibilityTime: 2000,
          });
        } else {
          Alert.alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      } catch (e) {
        console.log(e);
        Alert.alert("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className=" bg-white">
          <View className="bg-white h-[90vh]">
            <View className="m-3">
              <TextField
                fieldName={"Mật khẩu mới"}
                // icon={require("../../assets/lock.png")}
                value={form.password}
                placeholder="Nhập mật khẩu mới"
                handleChangeText={
                  (text) => setForm({ ...form, password: text })
                  // setForm({ ...form, password: text })
                }
                hidePassword={true}
              />
              <TextField
                fieldName={"Xác nhận mật khẩu mới"}
                // icon={require("../../assets/lock.png")}
                value={form.confirmPassword}
                handleChangeText={(text) =>
                  setForm({ ...form, confirmPassword: text })
                }
                placeholder="Xác nhận mật khẩu mới"
                hidePassword={true}
              />
            </View>
            <View className="mt-2 absolute bottom-10 w-[90%] items-center justify-center mx-5">
              <Button onSubmit={onSubmit} title="Đổi mật khẩu" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
