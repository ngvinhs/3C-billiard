import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import Confirmation from "../../../components/clb/Confirmation";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { getWaitingBills } from "../../../lib/action/bill";

const ConfirmBooking = () => {
  const club = useLocalSearchParams("clubId");
  // console.log("club", club);
  const clubId = club?.clubId;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    getDatas(clubId).finally(() => setIsRefreshing(false));
  }, [clubId]);
  // const data = [
  //   {
  //     id: 1,
  //     bookerName: "Nguyễn Văn A",
  //     bookerPhone: "0123456789",
  //     bookerEmail: "",
  //     paymentMethods: 0,
  //     price: 10000,
  //     bookingDate: "2024-06-02T00:00:00",
  //     descrpition: "",
  //     bookedSlotIds: [1, 2, 3],
  //     status: "WAITING",
  //   },
  //   {
  //     id: 2,
  //     bookerName: "Nguyễn Văn B",
  //     bookerPhone: "0123456789",
  //     bookerEmail: "",
  //     paymentMethods: 0,
  //     price: 10000,
  //     bookingDate: "2024-06-02T00:00:00",
  //     descrpition: "",
  //     bookedSlotIds: [1, 2, 3],
  //     status: "WAITING",
  //   },
  // ];

  const getDatas = async (clubId) => {
    try {
      setIsLoading(true);
      const response = await getWaitingBills(clubId);
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getDatas(clubId);
    }, [clubId])
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      className="bg-white"
    >
      {isLoading && !isRefreshing && (
        <View className="h-[90vh] justify-center items-center">
          <ActivityIndicator size="large" color="#e12727" />
        </View>
      )}

      <View className="m-2">
        {data?.map((item) => (
          <View key={item.id}>
            <Confirmation data={item} reloadData={onRefresh} />
          </View>
        ))}
        {/* <Confirmation /> */}
        {data.length === 0 && (
          <View className="h-[90vh] justify-center items-center">
            <Text className="font-pmedium text-lg">
              Hiện không có đơn đặt bàn nào
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ConfirmBooking;
