import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Totalbooking from "../../components/booking/totalbooking";
import {
  Slot,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";
import { bookingBidaSlot } from "../../lib/action/booking";
import Button from "../../components/Button";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import ClubCard from "../../components/booking/ClubCard";
const BookingSuccess = () => {
  const [slotId, setSlotId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useGlobalContext();
  const [orderCode, setOrderCode] = useState(null);

  const [userForm, setUserForm] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const club = useGlobalSearchParams("club");
  const clubId = club?.id;
  if (status === null) {
    requestPermission();
  }

  const getTimeIdsAndSelectedSlots = async () => {
    try {
      setSelectedSlot(null);
      const timeIds = JSON.parse(await AsyncStorage.getItem("@timeIds"));
      setSlotId(timeIds);
      // console.log("timeIds", timeIds);
      const selectedSlot = JSON.parse(
        await AsyncStorage.getItem("@selectedSlots")
      );
      // console.log("selectedSlots", selectedSlot);
      setSelectedSlot(selectedSlot);

      const date = JSON.parse(await AsyncStorage.getItem("@selectedDate"));

      setSelectedDate(date);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTimeIdsAndSelectedSlots();
  }, []);

  useEffect(() => {
    console.log("selectedDate", selectedDate);
  }, [selectedDate]);

  // console.log("abc", slotId, selectedSlot, selectedDate);

  const mergedData = selectedSlot?.reduce((acc, curr) => {
    const existingTable = acc.find(
      (item) => item.tableName === curr.table.tableName
    );

    if (existingTable) {
      existingTable.slotStartTimes.push(curr.time.slotStartTime);
      existingTable.timeIds.push(curr.time.id);
    } else {
      acc.push({
        tableName: curr.table.tableName,
        price: curr.table.price,
        slotStartTimes: [curr.time.slotStartTime],
        timeIds: [curr.time.id],
      });
    }

    return acc;
  }, []);

  // console.log("mergedData", mergedData);

  let totalPrice = mergedData?.reduce((total, item) => {
    return total + item.price * item.slotStartTimes.length;
  }, 0);

  // console.log("totalPrice", totalPrice);

  // console.log("timeIds", slotId);
  let date = new Date("2024-06-01T02:00:39.307Z");
  // console.log("slecteDate", formattedDate);
  // console.log("userid", user.userid);

  const userFormCheck = async () => {
    try {
      const userForm = await AsyncStorage.getItem("@booking-user-info");
      setUserForm(JSON.parse(userForm));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userFormCheck();
  }, []);
  useEffect(() => {}, [userForm]);

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Đã lưu!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View ref={imageRef} collapsable={false}>
      <ImageBackground
        className="h-[100vh]"
        source={require("../../assets/background.png")}
      >
        <View>
          <View className="w-[100%] items-center justify-center mt-2">
            <View>
              <Image
                source={require("../../assets/Subtract.png")}
                className="opacity-75 h-20 w-20"
              />
            </View>
            <Text className="text-center text-xl font-pbold">Chờ xác nhận</Text>
            <Text className="text-center text-base mx-14 font-pmedium">
              Tiến trình sẽ tốn từ 15 đến 30 phút xin quý khách hàng thông cảm.
            </Text>
          </View>
        </View>
        <View className="absolute bottom-0 bg-white h-[80vh] w-[100%] rounded-t-3xl border border-gray-200 shadow-lg">
          <View className="items-center">
            <ClubCard id={clubId} />

            {/* <View className="w-[90%] flex-row mt-5 rounded-md border items-center bg-white">
              <Image
                source={require("../../assets/clubImage.png")}
                className="w-[80px] h-[80px] m-2"
              />
              <View>
                <Text className="font-pbold text-lg">CLB Bida Đỗ Vương</Text>
                <View className="flex-row my-2 items-center">
                  <FontAwesome6 name="location-dot" size={20} color="#E12727" />
                  <Text className="text-sm mx-2">178, Hoàng Diệu 2 (2km)</Text>
                </View>
                <View className="flex-row mb-2 items-center">
                  <AntDesign name="star" size={20} color="#E12727" />
                  <Text className="text-sm mx-2">5.0 (24)</Text>
                </View>
              </View>
            </View> */}
          </View>

          <View>
            <Text className="mx-4 mt-2 font-pbold text-lg">Thời gian</Text>
            <Text className="mx-4 mt-2font-psemibold text-base text text-gray-500">
              {selectedDate}
            </Text>
          </View>
          <View>
            <Text className="font-pbold text-lg mx-4 mt-2">Các bàn đã đặt</Text>
            <View>
              {mergedData?.map((item, index) => (
                <Totalbooking key={index} data={item} />
              ))}
            </View>
          </View>
          <View className="mt-4 mx-4 border border-gray-300"></View>
          <View className="my-2 mx-4 ">
            <View className="flex-row justify-between">
              <Text className="font-pmedium text-base">Tên: </Text>
              <Text className="font-pregular text-base">{userForm?.name}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-pmedium text-base">Số điện thoại: </Text>
              <Text className="font-pregular text-base">{userForm?.phone}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-pmedium text-base">Email: </Text>
              <Text className="font-pregular text-base">{userForm?.email}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-pmedium text-base">
                Phương thức thanh toán:
              </Text>
              {userForm?.paymentMethod === "momo" ? (
                <Text className="font-pregular text-base">Ví momo</Text>
              ) : (
                <Text className="font-pregular text-base">Tại quầy</Text>
              )}
            </View>
          </View>
          <View className="mt-4 mx-4 border border-gray-300"></View>

          <View className="flex-row justify-between">
            <Text className="mx-4 mt-2 font-pbold text-lg">
              Tổng thanh toán
            </Text>
            <Text className="mx-4 mt-2 font-pbold text-lg">
              {/* {totalInVND} */}
              {/* {totalPrice && formatter.format(totalPrice)} */}
              {formatter.format(totalPrice)}
            </Text>
          </View>
          <View className=" flex-row justify-around mt-2">
            <TouchableOpacity
              onPress={() => router.replace("/home")}
              className="bg-primary w-[45%] items-center mx-2 py-4 rounded-3xl border-2 border-primary"
            >
              <View>
                <Text className="font-pbold text-white">Về Trang Chủ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onSaveImageAsync();
              }}
              className="bg-white w-[45%] mx-2 items-center py-4 rounded-3xl border-2 border-primary"
            >
              <View>
                <Text className="font-pbold text-primary">Tải hoá đơn</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BookingSuccess;
