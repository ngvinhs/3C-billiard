import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import TextField from "../../components/TextField";
import { useGlobalContext } from "../../context/GlobalProvider";
import { login } from "../../lib/action/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Button from "../../components/Button";

const SignIn = () => {
  const mailIcon = require("../../assets/mail.png");
  const passwordIcon = require("../../assets/lock.png");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsLogged, user } = useGlobalContext();

  //validate
  // const [form, setForm] = useState({
  //   mail: "trung@gmail.com",
  //   password: "123@abcD",
  // });

  const [form, setForm] = useState({
    mail: "",
    password: "",
  });

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (form.mail === "") {
      alert("Vui lòng nhập email");
      return false;
    }
    if (!emailRegex.test(form.mail)) {
      alert("Email không hợp lệ");
      return false;
    }
    if (form.password === "") {
      alert("Vui lòng nhập mật khẩu");
      return false;
    }
    // if (!passwordRegex.test(form.password)) {
    //   alert(
    //     "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
    //   );
    //   return false;
    // }

    return true;
  };

  const Loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        await login(form.password, form.mail);
        const token = await AsyncStorage.getItem("token");
        const decoded = jwtDecode(token);
        if (token) {
          setUser(decoded);
          setIsLogged(true);
          router.replace("/home");
        } else {
          Alert.alert("Đăng nhập thất bại");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Sai thông tin tài khoản hoặc mật khẩu");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* {isLoading && (
          <View className="absolute top-0 left-0 w-full h-full bg-transparent bg-opacity-20 flex-row justify-center items-center z-50">
            <ActivityIndicator size="large" color="primary" />
          </View>
        )} */}
        <ScrollView className=" bg-white">
          <View className="m-4">
            <View className="items-center mt-10">
              <Image
                source={require("../../assets/3C-Icon.png")}
                className="w-[120px] h-[120px] "
              />
            </View>
            <View>
              <Text className="text-primary font-pbold text-3xl text-center mt-5">
                Đăng nhập
              </Text>
            </View>

            <View className="mt-[20%]">
              <TextField
                fieldName="Email"
                placeholder="username@example.com"
                handleChangeText={(e) => {
                  setForm({ ...form, mail: e });
                }}
                value={form.mail}
                icon={mailIcon}
              />
              <TextField
                fieldName="Mật khẩu"
                placeholder="************"
                handleChangeText={(e) => {
                  setForm({ ...form, password: e });
                }}
                value={form.password}
                hidePassword={true}

                // icon={passwordIcon}
              />
            </View>
            <View className="flex-row justify-end w-[100%] mt-2">
              <Link className="text-lg" href="/forgot-password">
                Quên mật khẩu?
              </Link>
            </View>

            <View className="mt-5">
              <Button
                title={"Đăng nhập"}
                onSubmit={() => {
                  handleSubmit();
                  // Loading();
                }}
                isLoading={isLoading}
              />
              {/* <TouchableOpacity
                onPress={() => {
                  // router.push("/sign");
                  Alert.alert("Chức năng đang phát triển");
                }}
                className="bg-white rounded-3xl border-2 mt-4"
              >
                <View className="py-4 px-10 flex-row justify-center items-center w-[90vw]">
                  <Image
                    source={require("../../assets/flat-color-icons_google.png")}
                    className="text-center w-6 h-6"
                  />
                  <Text className="ml-2 text-primary text-base font-psemibold text-center">
                    Đăng nhập với Google
                  </Text>
                </View>
              </TouchableOpacity> */}
            </View>

            <View className="flex-row justify-center mt-10">
              <Text className="text-lg">Chưa có tài khoản?</Text>
              <Link href="/signup">
                <Text className="text-lg text-primary font-pbold">
                  {" "}
                  Đăng kí ngay
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
