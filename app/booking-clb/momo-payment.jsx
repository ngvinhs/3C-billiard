import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { QRImage } from "../../lib/action/vietqr";
import axios from "axios";
// import dotenv from "dotenv";
import { APP_BANKING_URL } from "@env";
import { updateBillImage } from "../../lib/action/bill";
import * as ImagePicker from "expo-image-picker";

const MomoPayment = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [vietQRImage, setVietQRImage] = useState("");
  const [userForm, setUserForm] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const bill = useLocalSearchParams("billId");
  const billId = bill.billId;
  const bankingUrl = APP_BANKING_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const getTotalPrice = async () => {
    const totalPrice = await AsyncStorage.getItem("@totalPrice");
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    getTotalPrice();
    console.log("totalPrice", totalPrice);
  }, []);

  const getUserForm = async () => {
    const userForm = await AsyncStorage.getItem("@booking-user-info");
    const userPhone = JSON.parse(userForm).phone;
    setUserForm(userForm);
    setUserPhone(userPhone);
  };

  useEffect(() => {
    getUserForm();
  }, []);

  const url = `${bankingUrl}&amount=${totalPrice}&addInfo=${userPhone}`;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    // setForm({ ...form, image: image });
    console.log("image", image);
  }, [image]);

  const handleUpdateImage = async (id, image) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("img", {
        uri: image,
        name: "image.png",
        type: "image/png",
      });
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        transformRequest: () => {
          return formData;
        },
      };

      const response = await updateBillImage(id, image, config);
      router.replace("/booking-clb/success");
    } catch (error) {
      console.log("error", error);
      Alert.alert("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      console.log("finally");
      setIsLoading(false);
    }
  };

  // const checkLoading = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <ScrollView className=" bg-white">
      <View className="h-[95vh]">
        {isLoading && (
          <View className="z-30 inset-0 absolute top-0 left-0 w-full h-[100vh] bg-gray-600/50 flex-row items-center justify-center">
            <ActivityIndicator size="large" color="#E12727" />
          </View>
        )}
        <View className="m-2">
          <Text className="text-center font-psemibold text-base">
            Quét QR phía dưới để chuyển tiền tới clb
          </Text>

          <View className="w-full h-[50vh]">
            <Image
              source={{
                uri: url,
              }}
              className="w-[95vw] h-[50vh]"
            />
          </View>
          <View className="mt-2">
            <Text className="font-pmedium text-base">
              Số tiền chuyển:{" "}
              <Text className="text-xl font-pbold">
                {formatter.format(totalPrice)}
              </Text>
            </Text>
          </View>
          <View className="mt-2">
            <Text className="font-pmedium text-base">
              Nội dung: <Text className="text-xl font-pbold">{userPhone}</Text>
            </Text>
          </View>
          <View>
            <Text className="font-pmedium text-base text-primary">
              Lưu ý: Mã chỉ được sử dụng 1 lần
            </Text>
          </View>
          <View>
            <Text className="font-pmedium text-base text-primary">
              Nếu chuyển tiền thành công, vui lòng thêm ảnh chuyển tiền để xác
              nhận
            </Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              className="w-[30vw] h-[30vw] border rounded-lg w p-2 justify-start"
              onPress={pickImage}
            >
              <View className="items-center my-auto">
                <Image
                  className="w-6 h-6 items-center"
                  source={require("../../assets/camera-photo.png")}
                />
                <Text>{image ? "Chọn lại" : "Chọn hình"}</Text>
              </View>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                className="w-[30vw] h-[30vw] ml-2 rounded-lg"
              />
            )}
          </View>
        </View>
        {image && (
          <View className="absolute bottom-4 w-full items-center">
            <TouchableOpacity
              className="py-4 bg-primary rounded-3xl border border-primary w-[95%] mx-2 items-center"
              onPress={() => {
                handleUpdateImage(billId, image);
                // checkLoading();
              }}
            >
              <View className="items-center">
                <Text className="text-white items-center font-psemibold text-base">
                  Đã chuyển tiền, xác nhận
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {/* <View className="absolute bottom-4 w-full items-center">
          <TouchableOpacity
            className="py-4 bg-primary rounded-3xl border-2 w-[95%] mx-2 items-center"
            onPress={() => {
              handleUpdateImage(billId);
            }}
          >
            <View className="items-center">
              <Text className="text-white items-center font-psemibold text-base">
                Đã chuyển tiền, xác nhận
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default MomoPayment;
