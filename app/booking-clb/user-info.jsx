import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import PaymentMethod from "../../components/booking/PaymentMethod";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";

const UserInfo = () => {
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const onPaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const { user } = useGlobalContext();

  console.log("user", user);
  // useEffect(() => {
  //   console.log("paymentMethod", paymentMethod);
  // }, [paymentMethod]);

  const [form, setForm] = useState({
    name: "",
    phone: user.Phone || "",
    email: user.email || "",
    paymentMethod: "",
    note: "",
  });

  const validateForm = () => {
    if (!form.name) {
      alert("Vui lòng nhập họ tên");
      return false;
    }
    if (!form.phone) {
      alert("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!form.email) {
      alert("Vui lòng nhập email");
      return false;
    }
    if (!form.paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    await AsyncStorage.removeItem("@booking-user-info");
    if (!validateForm()) {
      return;
    }
    // console.log("form", form);
    await AsyncStorage.setItem("@booking-user-info", JSON.stringify(form));
    router.push("/booking-clb/detail-appointment");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="bg-white ">
          <View className="mx-2 h-[85vh]">
            <TextField
              fieldName={"Họ tên"}
              placeholder={"Nhập họ tên"}
              icon={require("../../assets/user.png")}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
            <TextField
              fieldName={"Số điện thoại"}
              placeholder={"Nhập số điện thoại"}
              icon={require("../../assets/smartphone.png")}
              inputStyle={{
                keyboardType: "numeric",
              }}
              value={form.phone}
              onChangeText={(value) => setForm({ ...form, phone: value })}
            />
            <TextField
              fieldName={"Email"}
              placeholder={"username@example.com"}
              icon={require("../../assets/mail.png")}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <View className="mt-6">
              <Text className="font-pmedium text-lg">
                Phương thức thanh toán:{" "}
              </Text>
              <View>
                <PaymentMethod
                  title={"Ví điện tử momo"}
                  description={
                    "Quý khách vui lòng kiếm tra trạng thái đặt chổ sau 30 phút"
                  }
                  icon={
                    <Image
                      source={require("../../assets/payment/momoicon.png")}
                      className="w-10 h-10 rounded-full"
                    />
                  }
                  check={paymentMethod === "momo"}
                  onPaymentMethodChange={() => {
                    onPaymentMethodChange("momo");
                    setForm({ ...form, paymentMethod: "momo" });
                  }}
                />
                <PaymentMethod
                  title={"Thanh toán tại quầy"}
                  description={"Quý khách vui lòng đến sớm 10p để nhận bàn"}
                  icon={
                    <Ionicons name="cash-outline" size={30} color="#e12727" />
                  }
                  check={paymentMethod === "cash"}
                  onPaymentMethodChange={() => {
                    onPaymentMethodChange("cash");
                    setForm({ ...form, paymentMethod: "cash" });
                  }}
                />
              </View>
            </View>
            <View>
              <TextField
                fieldName={"Ghi chú"}
                placeholder={"Nhập ghi chú"}
                // icon={require("../../assets/note.png")}
              />
            </View>
            <View className="absolute bottom-0 w-[100%]">
              <Button title={"Đồng ý"} onSubmit={onSubmit} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default UserInfo;
