import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getBillsByOrderId } from "../../../lib/action/bill";
import { getBidaClubsByID } from "../../../lib/action/bidaclubs";
import ClubCard from "../../../components/booking/ClubCard";
import moment from "moment";
import { getSlotBySlotId } from "../../../lib/action/bidaTableSlot";

const BillDetail = () => {
  const orderCodeParams = useLocalSearchParams("orderCode");
  const orderCode = orderCodeParams?.orderCode;
  const [clubId, setClubId] = useState();
  const [billDetail, setBillDetail] = useState([]);
  const [bookedSlotId, setBookedSlotId] = useState([]);
  const [bookedSlot, setBookedSlot] = useState([]);
  const [error, setError] = useState(null);
  const getBillDetail = async (orderCode) => {
    try {
      const response = await getBillsByOrderId(orderCode);
      if (response) {
        setBillDetail(response);
        setClubId(response[0]?.clubId);
        setBookedSlotId(response[0]?.bookedSlotIds);
      } else {
        setError("No bill details found");
      }
      return response;
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getBillDetail(orderCode);
  }, [orderCode]);

  const getBookedSlot = async (slotId) => {
    try {
      if (Array.isArray(slotId)) {
        // Fetch all slots concurrently
        const responses = await Promise.all(
          slotId.map((id) => getSlotBySlotId(id))
        );
        setBookedSlot(responses); // Assuming setSlot can handle an array of slots
        return responses;
      } else {
        // Original logic for a single slotId
        const response = await getSlotBySlotId(slotId);
        setBookedSlot(response);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookedSlot(bookedSlotId);
  }, [bookedSlotId]);

  const formatTime = (time) => time.split(":").slice(0, 2).join(":");

  const renderSlotTimes = (slots) => {
    if (slots.length === 0) {
      return "Không có bàn nào được đặt";
    }

    return slots
      .map((slot) => {
        const startTime = formatTime(slot.slotStartTime);
        const endTime = formatTime(slot.slotEndTime);
        return `${startTime} - ${endTime}`;
      })
      .join(", ");
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <View>
      <ImageBackground
        className="h-[100vh]"
        source={require("../../../assets/background.png")}
      >
        <View className="absolute bottom-0 bg-white h-[90vh] w-[100%] rounded-t-3xl border border-gray-200 shadow-lg">
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
              {/* {selectedDate} */}
              {moment(billDetail[0]?.bookingDate).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View>
            <Text className="font-pbold text-lg mx-4 mt-2">Thời gian đặt</Text>
            <View className="ml-4">
              {/* {mergedData?.map((item, index) => (
            <Totalbooking key={index} data={item} />
          ))} */}
              <Text>{renderSlotTimes(bookedSlot)}</Text>
            </View>
          </View>
          <View className="mt-4 mx-4 border border-gray-300"></View>
          <View className="my-2 mx-4 ">
            <View className="flex-row justify-between">
              <Text className="font-pmedium text-base">Tên: </Text>
              <Text className="font-pregular text-base">
                {billDetail[0]?.bookerName}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-pmedium text-base">Số điện thoại: </Text>
              <Text className="font-pregular text-base">
                {" "}
                {billDetail[0]?.bookerPhone}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-pmedium text-base">Email: </Text>
              <Text className="font-pregular text-base">
                {" "}
                {billDetail[0]?.bookerEmail}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-pmedium text-base">
                Phương thức thanh toán:
              </Text>
              {billDetail[0]?.paymentMethod === 0 ? (
                <Text className="font-pregular text-base">Ví momo</Text>
              ) : (
                <Text className="font-pregular text-base">Tại quầy</Text>
              )}
            </View>
          </View>
          <View className="mt-4 mx-4 border border-gray-300"></View>

          <View className="flex-row justify-between">
            <Text className="mx-4 mt-2 font-pbold text-lg">Trạng thái đơn</Text>
            <Text
              className={`mx-4 mt-2 font-psemibold text-base text
                ${
                  (billDetail[0]?.status === "ACTIVE" && "text-green-500") ||
                  (billDetail[0]?.status === "WAITING" && "text-yellow-500") ||
                  (billDetail[0]?.status === "INACTIVE" && "text-primary") ||
                  (billDetail[0]?.status === "DELETED" && "text-primary")
                }
            `}
            >
              {(billDetail[0]?.status === "ACTIVE" && "Đã xác nhận") ||
                (billDetail[0]?.status === "WAITING" && "Chờ xác nhận") ||
                (billDetail[0]?.status === "INACTIVE" && "Đã huỷ") ||
                (billDetail[0]?.status === "DELETED" && "Đã hủy")}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="mx-4 mt-2 font-pbold text-lg">
              Tổng thanh toán
            </Text>
            <Text className="mx-4 mt-2 font-pbold text-lg">
              {/* {totalInVND} */}
              {/* {totalPrice && formatter.format(totalPrice)} */}
              {formatter.format(billDetail[0]?.price)}
            </Text>
          </View>

          {/* <View className=" flex-row justify-around mt-2">
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
      </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default BillDetail;
