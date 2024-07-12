import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import SearchGroup from "../../components/booking/SearchGroup";
import Club from "../../components/booking/club";
import { getAllBidaClubs } from "../../lib/action/bidaclubs";
import { FontAwesome6 } from "@expo/vector-icons";
import ProVincePicker from "../../components/modal/provincePicker";
import LocationPickeker from "../../components/modal/LocationPickeker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Booking = () => {
  // const province = "Hồ Chí Minh";
  // const district = "Thủ Đức";
  // const ward = "Hiệp Bình Chánh";
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDataa = async () => {
      try {
        const storedProvince = await AsyncStorage.getItem("province");
        const storedDistrict = await AsyncStorage.getItem("district");
        if (storedProvince !== null) {
          setProvince(storedProvince);
        }
        if (storedDistrict !== null) {
          setDistrict(storedDistrict);
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    };

    fetchDataa();
  }, [district, province]);

  console.log("province", province, district);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getAllBidaClubs(province ? province : district, search);
      console.log("res", res);
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    fetchData().finally(() => setIsRefreshing(false));
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [province, district, search]);

  const handleAddAddress = async (province, district) => {
    console.log("province, district", province, district);
    setProvince(province);
    setDistrict(district);
    //save it to async storage
    await AsyncStorage.setItem("province", province);
    await AsyncStorage.setItem("district", district);

    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          // refreshControl={
          //   <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          // }
          className="h-[100vh] bg-white"
        >
          <View className="mt-11">
            <View className="p-2">
              {!province && !district ? (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  className
                >
                  <Text className="font-pmedium ml-2 text-gray-500">
                    Chọn địa chỉ{" "}
                    <FontAwesome6 name="location-dot" size={16} color="red" />
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Text className="font-pmedium ml-2 text-gray-500">
                    {province}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    className="ml-1 flex-row items-center"
                  >
                    <FontAwesome6 name="location-dot" size={16} color="red" />
                    <View className="flex-row items-center ml-1">
                      <Text className="text-base">{district}</Text>
                      <Entypo name="chevron-down" size={16} color="red" />
                    </View>
                  </TouchableOpacity>
                </>
              )}
              <LocationPickeker
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleAddAddress={handleAddAddress}
              />
            </View>
            <View>
              <SearchGroup setSearchData={setSearch} />
            </View>

            <View className="items-center m-2">
              <Text className="font-pbold text-lg">Phòng chơi gần đây</Text>
            </View>
            {/* list clb */}
            {isLoading && !isRefreshing && (
              <View className="h-[70vh] items-center justify-center">
                <ActivityIndicator size="large" color="#e12727" />
              </View>
            )}
            {!isLoading && data.length === 0 && (
              <View className="h-[70vh] items-center justify-center">
                <Text className="font-pmedium text-gray-500">
                  Hiện tại vị trí bạn chưa có câu lạc bộ bida nào
                </Text>
                <Text className="font-pmedium text-gray-500">
                  Hãy thử đổi địa chỉ khác
                </Text>
              </View>
            )}

            <ScrollView
              className="h-[70vh]"
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }
            >
              {data
                ?.filter(
                  (item) => item.status === "ACTIVE" && item.averagePrice > 1000
                )
                .map((item, index) => (
                  <Club key={item.id} style="w-100" data={item} />
                ))}
            </ScrollView>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Booking;
