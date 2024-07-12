import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { getBidaClubsByID } from "../../lib/action/bidaclubs";
import { getSlotBySlotId } from "../../lib/action/bidaTableSlot";
import { router } from "expo-router";
const BookingStatus = ({ data }) => {
  const clubId = data.clubId;
  const slotId = data.bookedSlotIds;
  const [clubDetails, setClubDetails] = useState({});
  const [error, setError] = useState(null);
  const [slot, setSlot] = useState([]);
  const getClubDetails = async (clubId) => {
    try {
      const response = await getBidaClubsByID(clubId);
      setClubDetails(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getClubDetails(clubId);
  }, []);

  const getSlot = async (slotId) => {
    try {
      if (Array.isArray(slotId)) {
        // Fetch all slots concurrently
        const responses = await Promise.all(
          slotId.map((id) => getSlotBySlotId(id))
        );
        setSlot(responses); // Assuming setSlot can handle an array of slots
        return responses;
      } else {
        // Original logic for a single slotId
        const response = await getSlotBySlotId(slotId);
        setSlot(response);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSlot(slotId);
  }, []);

  const formatTime = (time) => time.split(":").slice(0, 2).join(":");

  const renderSlotTimes = (slots) => {
    if (slots.length === 0) {
      return "No slots available";
    }

    return slots
      .map((slot) => {
        const startTime = formatTime(slot.slotStartTime);
        const endTime = formatTime(slot.slotEndTime);
        return `${startTime} - ${endTime}`;
      })
      .join(", ");
  };

  useEffect(() => {
    console.log("clubDetails", clubDetails);
  }, [clubDetails]);

  const handleOpenLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/profile-detail/booking/bill-detail",
          params: { orderCode: data?.orderCode },
        });
      }}
      className="w-[95vw] items-center my-2 p-2 shadow-2xl rounded-lg bg-white mx-auto "
    >
      <View className="flex-row w-[90vw]  ">
        <View className="">
          <Image
            source={require("../../assets/Blank-Avatar.png")}
            // source={data.avatar}
            className="w-16 h-16 rounded-full"
          />
        </View>
        <View className="ml-4">
          <Text className="font-psemibold text-lg">
            {clubDetails?.bidaName}
          </Text>
          <View className="flex-row mt-1 w-[85%]">
            <FontAwesome6 name="location-dot" size={16} color="#e12727" />
            <Text className="ml-1 font-pmedium">{clubDetails?.address}</Text>
          </View>

          <Text className="font-pmedium mt-1 w-[90%]">
            {renderSlotTimes(slot)}
            {/* {slot.length >= 2 &&
              slot
                ?.map((item) =>
                  item.slotStartTime.split(":").slice(0, 2).join(":")
                )
                ?.join(", ")
                ?.replace(/,/g, " - ")}
            {slot.length >= 2 && ", "}
            {slot.length >= 2 &&
              slot
                ?.map((item) =>
                  item.slotEndTime.split(":").slice(0, 2).join(":")
                )
                ?.join(", ")
                ?.replace(/,/g, " - ")}

            {slot.length === 1 &&
              slot
                ?.map((item) =>
                  item.slotStartTime.split(":").slice(0, 2).join(":")
                )
                ?.join(", ")
                ?.replace(/,/g, " - ")}
            {slot.length === 1 && " - "}
            {slot.length === 1 &&
              slot
                ?.map((item) =>
                  item.slotEndTime.split(":").slice(0, 2).join(":")
                )
                ?.join(", ")
                ?.replace(" - ")} */}
          </Text>
          <Text className="font-pmedium mt-1">
            {new Date(data.bookingDate).toLocaleDateString()}
          </Text>
          <View className="flex-row justify-between my-1">
            <Text className="text-primary font-psemibold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.price)}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row w-[80vw] justify-between items-center">
        <TouchableOpacity
          onPress={() => {
            handleOpenLink(clubDetails?.googleMapLink);
          }}
          className="items-center"
        >
          <Image
            className="w-6 h-8"
            source={require("../../assets/ggmap.png")}
          />
          <Text className="font-pmedium">Bản đồ</Text>
        </TouchableOpacity>
        <View
          className={`${data.status === "ACTIVE" && "bg-green-500"} ${
            data.status === "WAITING" && "bg-yellow-500"
          } ${data.status === "DELETED" && "bg-primary"} 
          ${data.status === "INACTIVE" && "bg-primary"}
          p-4 rounded-3xl w-32`}
        >
          <Text className="font-pbold text-white text-center">
            {(data.status === "ACTIVE" && "Đã xác nhận") ||
              (data.status === "WAITING" && "Chờ xác nhận") ||
              (data.status === "REJECTED" && "Bị từ chối") ||
              (data.status === "DELETED" && "Đã hủy") ||
              (data.status === "INACTIVE" && "Đã huỷ")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingStatus;
