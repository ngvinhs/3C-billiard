import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { acceptBill, rejectBill } from "../../lib/action/bill";
import {
  getBidaTableSlotByTableId,
  getSlotBySlotId,
} from "../../lib/action/bidaTableSlot";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Confirmation = ({ data, reloadData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [slot, setSlot] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleAccept = async () => {
    try {
      setIsAccepted(true);
      const response = await acceptBill(data.id);
      console.log(response);
      reloadData();
      Alert.alert("Đã chấp nhận đơn đặt bàn");
    } catch (error) {
      console.log(error);
    } finally {
      setIsAccepted(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsRejected(true);
      const response = await rejectBill(data.id);
      console.log(response);
      Alert.alert("Đã từ chối đơn đặt bàn");
      reloadData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRejected(false);
    }
  };

  if (data.bookedSlotIds) {
    const getBookingTime = async (id) => {
      try {
        console.log("id", id);
        const response = await getBidaTableSlotByTableId(id);
        console.log("rslx", response);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      data.bookedSlotIds.map((item) => getBookingTime(item));
    }, []);
  }

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
    getSlot(data.bookedSlotIds);
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

  const loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View className="rounded-lg border my-1 h-[20vh]">
      <View className="flex-row  p-2">
        <View className="w-3/4">
          <View>
            <Text className="font-pmedium text-lg">{data.bookerName}</Text>
          </View>
          <Text className="font-pmedium">
            Ngày đặt: {new Date(data.bookingDate).toLocaleDateString("en-GB")}
          </Text>
          <Text className="font-pmedium">
            Thời gian:
            {renderSlotTimes(slot)}
          </Text>
          <Text className="font-pmedium">
            Phương thức thanh toán:{" "}
            {data.paymentMethods === 0 ? "Momo" : "Tiền mặt"}{" "}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            openModal();
          }}
          className=" items-end w-1/4"
        >
          <Image
            source={{ uri: data?.image }}
            className="w-[50%] h-20"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-0 w-[100%]">
        <View className="flex-row justify-end gap-3 mt-2 mx-2 mb-2">
          <TouchableOpacity
            onPress={() => {
              handleAccept();
              // loading();
            }}
            className="bg-green-500 p-4 rounded-lg w-28 flex-row items-center justify-center"
          >
            <Text className=" text-white">Đồng ý</Text>
            <Text> </Text>
            {isAccepted && <ActivityIndicator size="small" color="#fff" />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleReject();
              // loading();
            }}
            className="bg-primary p-4 rounded-lg w-28 flex-row items-center justify-center"
          >
            <Text className="text-white">Từ chối</Text>
            <Text> </Text>
            {isRejected && <ActivityIndicator size="small" color="#fff" />}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-75">
          <Image
            source={{ uri: data?.image }}
            className="w-full h-full"
            resizeMode="contain"
          />
          <View className="absolute top-10 right-5">
            <Button title="Đóng" onPress={closeModal} />
          </View>
        </View>
        <StatusBar style="inverted" />
      </Modal>
    </View>
  );
};

export default Confirmation;
