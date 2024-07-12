import {
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  TextInput,
  TextInputBase,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import DistrictPicker from "./districtPicker";
import ProVincePicker from "./provincePicker";
import TextField from "../TextField";

const LocationPickeker = ({
  modalVisible,
  setModalVisible,
  handleAddAddress,
}) => {
  const [provinceSearch, setProvinceSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [isOpenPro, setIsOpenPro] = useState(false);
  const [isOpenDis, setIsOpenDis] = useState(false);

  const [province, setProvince] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [district, setDistrict] = useState("");

  const [timer, setTimer] = useState(null);

  const handleAddProvince = (value) => {
    let provinceId, provinceName;

    if (Array.isArray(value)) {
      [provinceId, provinceName] = value;
    } else if (typeof value === "string") {
      [provinceId, provinceName] = value.split(",");
    } else {
      console.error(
        "handleAddProvince was called with an unsupported type:",
        value
      );
      return; // Exit the function if value is neither a string nor an array
    }

    console.log("provinceName", provinceName);
    setProvince(provinceName);
    setProvinceCode(provinceId);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      setIsOpenPro(false);
    }, 2500);

    setTimer(newTimer);
  };

  const handleAddDistrict = (value) => {
    console.log("value", value);

    setDistrict(value);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      setIsOpenDis(false);
    }, 2000);

    setTimer(newTimer);
  };

  useEffect(() => {
    setDistrict("");
  }, [provinceCode]);

  return (
    <View className="flex-1 justify-center items-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center mt-6">
          <View className="m-5 bg-white w-[95vw] rounded-lg p-9 items-center shadow-lg mx-4">
            <Text className="text-xl">Chọn địa chỉ</Text>
            <View className="w-[95vw]">
              <Text>Tỉnh thành/ Thành phố</Text>
              <TextInput
                placeholder="Tìm kiếm"
                onChangeText={(text) => setProvinceSearch(text)}
                value={provinceSearch ? provinceSearch : province}
                className="border border-gray-300 rounded-lg p-2 w-[95vw] mb-2"
                onFocus={() => setIsOpenPro(true)}
              />

              {isOpenPro && (
                <ProVincePicker
                  provinceSearch={provinceSearch}
                  setProvinceSearch={setProvinceSearch}
                  addProvince={handleAddProvince}
                />
              )}
            </View>

            <View className="w-[95vw]">
              <Text>Quận/huyện</Text>
              {/* <DistrictPicker /> */}
              <TextInput
                placeholder="Tìm kiếm"
                onChangeText={(text) => setProvinceSearch(text)}
                value={districtSearch ? districtSearch : district}
                className="border border-gray-300 rounded-lg p-2 w-[95vw] mb-2"
                onFocus={() => setIsOpenDis(true)}
              />

              {isOpenDis && (
                <DistrictPicker
                  districtSearch={districtSearch}
                  setDistrictSearch={setDistrictSearch}
                  addDistrict={handleAddDistrict}
                  parentCode={provinceCode}
                />
              )}
            </View>

            {/* <Text>Quận</Text>
            <DistrictPicker /> */}
            <View className="flex-row justify-around w-[100%]">
              <TouchableOpacity
                className="bg-primary rounded-lg p-2"
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleAddAddress(province, district);
                }}
              >
                <Text className="text-white font-bold text-center">
                  Xác nhận
                </Text>
              </TouchableOpacity>
              <Pressable
                className="bg-primary rounded-lg p-2"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text className="text-white font-bold text-center">Huỷ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LocationPickeker;
