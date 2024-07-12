import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import InputField from "../../../components/clb/InputField";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { createTableBida } from "../../../lib/action/bidaTable";
const CreateTable = () => {
  const [image, setImage] = useState(null);
  const club = useLocalSearchParams("clubId");
  const clubId = club.clubId;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    id: clubId,
    name: "",
    price: "",
    type: "",
    image: "",
  });

  const onChange = (key, value) => {
    setForm({ ...form, [key]: value });
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

  const validateForm = () => {
    if (!form.name || !form.price || !form.type) {
      Alert.alert("Vui lòng điền đầy đủ thông tin");
      return false;
    }

    if (!image) {
      Alert.alert("Vui lòng chọn hình ảnh");
      return false;
    }
    return true;
  };

  const createTable = async (data) => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("BidaCludId", data.id);
      formData.append("Price", data.price);
      formData.append("TableName", data.name);
      formData.append("Note", data.type);
      formData.append("image", {
        uri: image,
        name: "createTable",
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
      const response = await createTableBida(data, config);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Create Table Success");
      setIsLoading(false);
      router.back();
    }
  };

  return (
    <ScrollView>
      <View className="h-[90vh] bg-white">
        {isLoading && (
          <View className="absolute w-full h-full bg-gray-300 bg-opacity-50 items-center justify-center">
            <ActivityIndicator size="large" color="#e12727" />
          </View>
        )}
        <View className="mx-4">
          <Text className="text-lg font-psemibold">Thông tin về bàn bida </Text>
          <InputField
            title={"Tên bàn bida"}
            value={form.name}
            onChange={(text) => onChange("name", text)}
          />
          <InputField
            title={"Giá tiền của bàn"}
            value={form.price}
            onChange={(text) => onChange("price", text)}
            number={true}
          />
          <Text className="text-lg font-psemibold">Loại bàn bida </Text>
          <InputField
            title={"Phăng, pool, snooker,..."}
            value={form.type}
            onChange={(text) => onChange("type", text)}
          />
          <Text className="text-lg font-psemibold">Hình của bàn </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="w-[30vw] h-[30vw] border rounded-lg w p-2 justify-start"
              onPress={pickImage}
            >
              <View className="items-center my-auto">
                <Image
                  className="w-6 h-6 items-center"
                  source={require("../../../assets/camera-photo.png")}
                />
                <Text>Chọn hình</Text>
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
        <View className="absolute bottom-6 w-full">
          <TouchableOpacity
            className="bg-primary rounded-3xl py-4 items-center border-2 mt-4 mx-2"
            onPress={() => {
              createTable(form);
            }}
          >
            <Text className="text-white">Thêm bàn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateTable;
