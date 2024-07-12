import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import InputField from "../../../components/clb/InputField";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { createBidaClub } from "../../../lib/action/bidaclubs";
const ClubOwned = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const { user } = useGlobalContext();
  const userId = user.userid;
  const [form, setForm] = useState({
    userId: userId,
    bidaName: "",
    image: "",
    address: detailAddress + ", " + ward + ", " + district + ", " + province,
    email: "",
    description: "",
    phone: "",
    openTime: "",
    closeTime: "",
    googleMapLink: "",
  });

  const pickerRef = useRef();
  const open = () => {
    pickerRef.current.focus();
  };

  const close = () => {
    pickerRef.current.blur();
  };

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
    setForm({ ...form, image: image });
    console.log("image", image);
  }, [image]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  useEffect(() => {
    setForm({
      ...form,
      address: detailAddress + ", " + ward + ", " + district + ", " + province,
    });
  }, [province, district, ward, detailAddress]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const validate = () => {
    if (
      form.bidaName === "" ||
      form.address === "" ||
      form.description === "" ||
      form.image === "" ||
      form.openTime === "" ||
      form.closeTime === "" ||
      form.phone === "" ||
      form.email === "" ||
      form.googleMapLink === ""
    ) {
      Alert.alert("Vui lòng điền đầy đủ thông tin");
      return false;
    }

    if (form.phone.length < 10 || form.phone.length > 11) {
      Alert.alert("Số điện thoại không hợp lệ");
      return false;
    }

    if (form.email.indexOf("@") === -1) {
      Alert.alert("Email không hợp lệ");
      return false;
    }

    if (form.openTime === form.closeTime) {
      Alert.alert("Giờ mở cửa và giờ đóng cửa không được trùng nhau");
      return false;
    }

    if (!/^([0-1][0-9]|2[0-3]):00$/.test(form.openTime)) {
      Alert.alert(
        "Thời gian mở cửa không hợp lệ. VD: 08:00 là thời gian hợp lệ."
      );
      return false;
    }

    if (!/^([0-1][0-9]|2[0-3]):00$/.test(form.closeTime)) {
      Alert.alert(
        "Thời gian đóng cửa không hợp lệ. 23:00 là thời gian hợp lệ."
      );
      return false;
    }

    if (!/https:/.test(form.googleMapLink)) {
      Alert.alert("Link Google Map không hợp lệ");
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", form.userId);
      formData.append("bidaName", form.bidaName);
      formData.append("address", form.address);
      formData.append("email", form.email);
      formData.append("description", form.description);
      formData.append("phone", form.phone);
      formData.append("openTime", form.openTime);
      formData.append("closeTime", form.closeTime);
      formData.append("googleMapLink", form.googleMapLink);
      formData.append("image", {
        uri: image,
        name: "createBidaClub",
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
      const response = await createBidaClub(form, config);
      console.log(response);
      router.back("profile-detail/club-owned");
    } catch (error) {
      console.log(error);
      Alert.alert("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="bg-white">
          <View className="mx-4">
            <View>
              <Text className="font-psemibold text-base">
                Thông tin chi tiết về câu lạc bộ
              </Text>
              <InputField
                value={form.bidaName}
                onChange={(value) => {
                  setForm({ ...form, bidaName: value });
                }}
                title={"Tên câu lạc bộ"}
              />

              <InputField
                value={province}
                onChange={(value) => {
                  setProvince(value);
                }}
                title={"Tỉnh/Thành phố"}
              />

              <InputField
                value={district}
                onChange={(value) => {
                  setDistrict(value);
                }}
                title={"Quận / Huyện / Thị xã / Thành phố"}
              />
              <InputField
                value={ward}
                onChange={(value) => {
                  setWard(value);
                }}
                title={"Phường/Xã/Thị trấn"}
              />
              <InputField
                value={detailAddress}
                onChange={(value) => {
                  setDetailAddress(value);
                }}
                title={"Địa chỉ cụ thể"}
              />
            </View>
            <View className="mt-2">
              <Text className="font-psemibold text-base">Thời gian</Text>

              <InputField
                value={form.openTime}
                onChange={(value) => {
                  setForm({ ...form, openTime: value });
                }}
                title={"Giờ mở cửa VD: 08:00"}
              />
              <InputField
                value={form.closeTime}
                onChange={(value) => {
                  setForm({ ...form, closeTime: value });
                }}
                title={"Giờ đóng cửa VD: 22:00"}
              />
            </View>
            <View className="mt-2">
              <Text className="font-psemibold text-base">Liên hệ</Text>
              <InputField
                value={form.phone}
                onChange={(value) => {
                  setForm({ ...form, phone: value });
                }}
                title={"Số điện thoại"}
                number={true}
              />
              <InputField
                value={form.email}
                onChange={(value) => {
                  setForm({ ...form, email: value });
                }}
                title={"Email"}
              />
              <InputField
                value={form.googleMapLink}
                onChange={(value) => {
                  setForm({ ...form, googleMapLink: value });
                }}
                title={"Liên kết GoogleMap của câu lạc bộ"}
              />
            </View>
            <View className="mt-2">
              <Text className="font-psemibold text-base">
                Hình ảnh về câu lạc bộ
              </Text>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={pickImage}
                  className="items-center w-[30vw] h-[30vw] border rounded-lg  my-2 justify-center"
                >
                  <Image
                    className="h-6 w-6"
                    source={require("../../../assets/camera-photo.png")}
                  />
                </TouchableOpacity>
                {image && (
                  <Image
                    source={{ uri: image }}
                    className="w-[30vw] h-[30vw] ml-2 rounded-lg my-2"
                  />
                )}
              </View>
            </View>
            <View className="mt-2">
              <Text className="font-psemibold text-base">
                Mô tả về câu lạc bộ của bạn
              </Text>
              <TextInput
                value={form.description}
                className="border border-gray-600 rounded-md p-2 w-full text-base items-center "
                placeholder={"Thông tin về câu lạc bộ của bạn"}
                onChangeText={(text) => setForm({ ...form, description: text })}
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
          <View className="p-4">
            <TouchableOpacity
              onPress={() => {
                submit();
              }}
              className="bg-primary rounded-xl py-4 w-full items-center justify-center"
            >
              <Text className="text-white text-base font-psemibold ">
                Hoàn tất
              </Text>
              {isLoading && (
                <ActivityIndicator size="small" color="#fff" className="ml-2" />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ClubOwned;
