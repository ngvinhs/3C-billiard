import {
  View,
  Text,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../../components/TextField";
import { Link, router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { register, registerAccount } from "../../lib/action/users";

const SignUp = () => {
  const userIcon = require("../../assets/user.png");
  const mailIcon = require("../../assets/mail.png");
  const phoneIcon = require("../../assets/smartphone.png");
  const passwordIcon = require("../../assets/lock.png");
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    // UserName: "",
    // Email: "",
    // Phone: "",
    // Password: "",
    UserName: "",
    Email: "",
    Phone: "",
    Password: "",
  });

  const formData = new FormData();

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(\+)?(\d[- .]*){7,13}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (form.UserName === "") {
      alert("Vui lòng nhập họ và tên");
      return false;
    }
    if (form.Email === "") {
      alert("Vui lòng nhập email");
      return false;
    }
    if (form.Phone === "") {
      alert("Vui lòng nhập số điện thoại");
      return false;
    }
    if (form.Password === "") {
      alert("Vui lòng nhập mật khẩu");
      return false;
    }

    if (!emailRegex.test(form.Email)) {
      alert("Email không hợp lệ");
      return false;
    }
    if (!phoneRegex.test(form.Phone)) {
      alert("Số điện thoại không hợp lệ");
      return false;
    }
    // if (!passwordRegex.test(form.password)) {
    //   alert(

    return true;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("UserName", form.UserName);
      formData.append("Email", form.Email);
      formData.append("Phone", form.Phone);
      formData.append("Password", form.Password);

      try {
        await AsyncStorage.setItem("email", form.Email);
        const response = await registerAccount(formData);
        if (response.note === "Success") {
          Toast.show({
            type: "success",
            text1: "Đăng kí thành công",
            text2: "Chuyển hướng đến trang đăng nhập",
          });
          router.replace("/signin");
        } else if (response.message.includes("already exists.")) {
          Alert.alert(`Email đã tồn tại!`);
        } else {
          Alert.alert(`Lỗi hệ thống!`);
        }
      } catch (error) {
        // saving error
        console.log(error);
        Alert.alert(`Lỗi hệ thống!`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const Loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="bg-white">
          <View className="m-4">
            <View className="mt-10 items-center">
              <Image
                source={require("../../assets/3C-Icon.png")}
                className="w-[120px] h-[120px] "
              />
            </View>

            <View className="mt-4">
              <Text className="text-center text-primary font-pbold text-4xl mt-5">
                Đăng kí
              </Text>
            </View>

            <View className="mt-4">
              <TextField
                placeholder="Your full name"
                fieldName="Họ và tên"
                handleChangeText={(e) => {
                  setForm({ ...form, UserName: e });
                }}
                value={form.UserName}
                icon={userIcon}
              />
              <TextField
                placeholder="username@example.com"
                fieldName="Email"
                handleChangeText={(e) => {
                  setForm({ ...form, Email: e });
                }}
                value={form.Email}
                icon={mailIcon}
              />
              <TextField
                placeholder="0978654321"
                fieldName="Số điện thoại"
                handleChangeText={(e) => {
                  setForm({ ...form, Phone: e });
                }}
                value={form.Phone}
                icon={phoneIcon}
              />
              <TextField
                placeholder="************"
                handleChangeText={(e) => {
                  setForm({ ...form, Password: e });
                }}
                fieldName="Mật khẩu"
                value={form.Password}
                hidePassword={true}
                // icon={passwordIcon}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              className="mt-4 bg-primary py-4 rounded-full flex-row justify-center items-center"
            >
              <Text className="text-white font-pbold text-xl">Đăng kí</Text>
              {isLoading ? (
                <>
                  <Text> </Text>
                  <ActivityIndicator size="small" color="#fff" />
                </>
              ) : null}
            </TouchableOpacity>
            <View className="flex-row justify-center mt-4">
              <Text className="font-pmedium text-lg">Đã có tài khoản? </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/signin");
                }}
              >
                <Text className="text-primary font-pbold text-lg">
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
