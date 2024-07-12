import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import {
  bookingAndGenerateBill,
  bookingBidaSlot,
} from "../../lib/action/booking";
import Button from "../../components/Button";
import ClubCard from "../../components/booking/ClubCard";
const DetailAppoinment = () => {
  const [slotId, setSlotId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useGlobalContext();
  const [orderCode, setOrderCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userForm, setUserForm] = useState(null);
  const [billId, setBillId] = useState(null);
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const club = useGlobalSearchParams("clubId");
  const clubId = club.id;

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

  const handleBooking = async () => {
    // router.push("/booking-clb/momo-payment");
    let date = selectedDate;
    let [year, month, day] = date.split("/");
    let formattedDate = new Date(`20${year}-${month}-${day}`).toISOString();

    console.log("formattedDate", formattedDate);
    setIsLoading(true);
    await AsyncStorage.removeItem("@totalPrice");
    if (userForm.paymentMethod == "momo") {
      await AsyncStorage.setItem("@totalPrice", totalPrice.toString());

      try {
        setIsLoading(true);
        // const formData = new FormData();
        // formData.append("userId", user.userid);
        // formData.append("bookingDate", newFormat);
        // // formData.append("bT_SlotIds", slotId);
        // // formData.append("image", null);
        // formData.append("orderCode", "");
        // formData.append("paymentMethods", 0);
        // formData.append("bookerName", userForm.name);
        // formData.append("bookerPhone", userForm.phone);
        // formData.append("bookerEmail", userForm.email);
        // const config = {
        //   headers: {
        //     "content-type": "multipart/form-data",
        //   },
        //   transformRequest: () => {
        //     return formData;
        //   },
        // };
        const response = await bookingAndGenerateBill(
          user.userid,
          slotId,
          formattedDate,
          userForm,
          0
        );
        console.log("response.id", response.id);
        setBillId(response.id);
        console.log("billId", billId);
        router.replace({
          pathname: "/booking-clb/momo-payment",
          params: { billId: response.id },
        });
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
          Alert.alert("Có lỗi xảy ra trong quá trình đặt bàn");
        } else {
          console.log(error);
          Alert.alert("Có lỗi xảy ra trong quá trình đặt bàn");
        }
      } finally {
        setIsLoading(false);
      }

      return;
    }
    if (userForm.paymentMethod == "cash") {
      try {
        const response = await bookingAndGenerateBill(
          user.userid,
          slotId,
          formattedDate,
          userForm,
          1
        );
        console.log("response", response);
        router.replace("/booking-clb/success");
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
          Alert.alert("Có lỗi xảy ra trong quá trình đặt bàn");
        } else {
          console.log(error);
          Alert.alert("Có lỗi xảy ra trong quá trình đặt bàn");
        }
      } finally {
        setIsLoading(false);
      }
      return;
    }
  };

  // const checkLoading = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // };

  return (
    <View>
      {isLoading && (
        <View className="z-30 inset-0 absolute top-0 left-0 w-full h-[90vh] bg-gray-600/50 flex-row items-center justify-center">
          <ActivityIndicator size="large" color="#E12727" />
        </View>
      )}
      <ImageBackground
        className="h-[100vh]"
        source={require("../../assets/background.png")}
      >
        <View>
          <View className="w-[100%] items-center justify-center">
            {/* <View className="w-[90%] flex-row mt-16 rounded-md border bg-white">
              <Image
                source={require("../../assets/clubImage.png")}
                className="w-[80px] h-[80px] m-2"
              /> */}
            <ClubCard id={clubId} />

            {/* <View>
                <Text className="font-pbold text-lg">CLB Bida Đỗ Vương</Text>
                <View className="flex-row my-2 items-center">
                  <FontAwesome6 name="location-dot" size={20} color="#E12727" />
                  <Text className="text-sm mx-2">178, Hoàng Diệu 2 (2km)</Text>
                </View>
                <View className="flex-row mb-2 items-center">
                  <AntDesign name="star" size={20} color="#E12727" />
                  <Text className="text-sm mx-2">5.0 (24)</Text>
                </View>
              </View> */}
            {/* </View> */}
          </View>
        </View>
        <View className="absolute bottom-4 bg-white h-[70vh] w-[100%] rounded-t-3xl border border-gray-200 shadow-lg">
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
          <View className="w-[95vw] items-center absolute bottom-24 mx-2 ">
            {/* <Button
              title="Thanh toán"
              onPress={() => {
                router.push("/booking-clb/momo-payment");
                console.log("momo");
              }}
              icon={<Entypo name="wallet" size={24} color="white" />}
            /> */}

            <TouchableOpacity
              onPress={() => {
                handleBooking();
                // checkLoading();
              }}
              className="flex-row py-4 bg-primary rounded-3xl border border-primary w-full"
            >
              <View className="flex-row justify-center w-full">
                <Text className=" text-white font-psemibold text-base ">
                  {userForm?.paymentMethod === "momo"
                    ? "Thanh toán"
                    : "Đặt bàn"}
                </Text>
                <Text> </Text>
                <Entypo name="wallet" size={24} color="white" />
              </View>
              {isLoading && (
                <View>
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailAppoinment;
