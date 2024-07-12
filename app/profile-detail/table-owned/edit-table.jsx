import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import InputField from "../../../components/clb/InputField";
import * as ImagePicker from "expo-image-picker";
import { getBidaTableByTableId } from "../../../lib/action/bidaTable";

const EditTable = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const id = useLocalSearchParams("tableId");
  const tableId = id.tableId;
  const bidaClub = useLocalSearchParams("clubId");
  const bidaClubId = bidaClub.clubId;

  const [form, setForm] = useState({});

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
  }, [image]);

  const getBidaTable = async (id) => {
    try {
      setIsLoading(true);
      const response = await getBidaTableByTableId(id);
      setForm(response);
      console.log("form", response);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBidaTable(tableId);
  }, []);

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
            value={form.tableName}
            onChange={(text) => onChange("name", text)}
          />
          <InputField
            title={"Giá tiền của bàn"}
            value={form.price && form.price.toString()}
            onChange={(text) => onChange("price", text)}
            number={true}
          />
          <Text className="text-lg font-psemibold">Loại bàn bida </Text>
          <InputField
            title={"Phăng, pool, snooker,..."}
            value={form.note}
            onChange={(text) => onChange("note", text)}
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
            {!image && (
              <Image
                source={{ uri: form.image }}
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
            <Text className="text-white">Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditTable;
