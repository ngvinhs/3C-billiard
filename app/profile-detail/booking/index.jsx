import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import TabsBooking from "../../../components/booking/TabsBooking";
import { router } from "expo-router";
import BookingStatus from "../../../components/booking/BookingStatus";
import {
  billBookingHistory,
  bookingHistory,
} from "../../../lib/action/booking-history";
import { useGlobalContext } from "../../../context/GlobalProvider";

const Booking = () => {
  const [active, setActive] = useState(true);
  const [history, setHistory] = useState(false);
  const [booking, setBooking] = useState([]);
  const [activeBookingData, setActiveBookingData] = useState([]);
  const [historyBookingData, setHistoryBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const onActiveChange = () => {
  //   setActive(!active);
  //   setHistory(!history);
  // };
  const { user } = useGlobalContext();
  const userId = user?.userid;
  const onChangeTabs = () => {
    setActive(!active);
    setHistory(!history);
  };

  // const activeBookingData = [
  //   {
  //     id: 1,
  //     name: "CLB Bida Đỗ Vương",
  //     address: "Thủ Đức, TP.Hồ Chí Minh",
  //     time: "19:00 - 21:00",
  //     date: "Thứ 2, 20/09/2021",
  //     status: "Chờ xác nhận",
  //     price: "200.000đ",
  //     avatar: require("../../../assets/avatar.png"),
  //   },

  //   {
  //     id: 2,
  //     name: "Bida làng đại học",
  //     address: "Dĩ An, Bình Dương",
  //     time: "19:00 - 21:00",
  //     date: "Thứ 2, 20/09/2021",
  //     status: "Chờ xác nhận",
  //     price: "320.000đ",

  //     avatar: require("../../../assets/avatar.png"),
  //   },
  // ];

  // const historyBookingData = [
  //   {
  //     id: 1,
  //     name: "CLB Bida Đỗ Vương",
  //     address: "Thủ Đức, TP.Hồ Chí Minh",
  //     time: "19:00 - 21:00",
  //     date: "Thứ 2, 20/09/2021",
  //     status: "Đã xác nhận",
  //     price: "200.000đ",
  //     avatar: require("../../../assets/avatar.png"),
  //   },

  //   {
  //     id: 2,
  //     name: "Bida làng đại học",
  //     address: "Dĩ An, Bình Dương",
  //     time: "19:00 - 21:00",
  //     date: "Thứ 2, 20/09/2021",
  //     status: "Bị từ chối",
  //     price: "320.000đ",

  //     avatar: require("../../../assets/avatar.png"),
  //   },
  // ];

  const onActiveChange = () => {
    setActive(!active);
    setHistory(!history);
  };

  const bookingData = async (userId) => {
    try {
      setIsLoading(true);
      const response = await billBookingHistory(userId);
      console.log(response);
      setBooking(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    bookingData(userId);
  }, []);

  useEffect(() => {
    if (booking) {
      const activeBookingData = booking.filter(
        (item) => item.status === "WAITING"
      );
      setActiveBookingData(activeBookingData);

      const historyBookingData = booking.filter(
        (item) => item.status !== "WAITING"
      );
      setHistoryBookingData(historyBookingData);
    }
  }, [booking]);

  useEffect(() => {
    console.log("activeBookingData", activeBookingData);
    console.log("historyBookingData", historyBookingData);
  }, [activeBookingData, historyBookingData, booking]);

  return (
    <View className="bg-white h-[100vh]">
      <View className="mt-1">
        <TabsBooking
          activeBooking={active}
          history={history}
          onChange={onChangeTabs}
        />
        <ScrollView className="h-[80vh]">
          {isLoading && (
            <View className="h-[80vh] justify-center items-center">
              <ActivityIndicator size="large" color="#e12727" />
            </View>
          )}

          {!isLoading &&
            activeBookingData?.length === 0 &&
            historyBookingData?.length === 0 && (
              <View>
                <Text className="text-center mt-4 font-pmedium">
                  Bạn chưa đặt sân nào
                </Text>
              </View>
            )}

          {!isLoading &&
            active &&
            activeBookingData
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              ?.filter((data) => data.status === "WAITING")?.length === 0 && (
              <View className="h-[80vh] justify-center items-center">
                <Text className="text-center mt-4 font-pmedium">
                  Bạn chưa đặt bàn nào
                </Text>
                <TouchableOpacity
                  className="text-center justify-center items-center m-0"
                  onPress={() => router.replace("/booking")}
                >
                  <Text className="text-primary text-xl font-psemibold text-center">
                    {" "}
                    Đặt ngay
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          {!isLoading &&
            active &&
            activeBookingData
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              ?.filter((data) => data.status === "WAITING")
              ?.map((data) => <BookingStatus key={data.id} data={data} />)}

          {/* {active &&
            activeBookingData
              ?.filter((data) => data.status === "WAITING")
              ?.map((data) => (
                <BookingStatus
                  key={data.id}
                  loading={isLoading}
                  setIsLoading={setIsLoading}
                  data={data}
                />
              ))} */}
          {history &&
            historyBookingData
              ?.sort(
                (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
              )
              ?.filter((data) => data.status !== "WAITING")
              ?.map((data) => <BookingStatus key={data.id} data={data} />)}
        </ScrollView>
      </View>
    </View>
  );
};

export default Booking;
