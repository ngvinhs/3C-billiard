import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getBillsByClubId } from "../../../lib/action/bill";
import moment from "moment";

const ClubStatistic = () => {
  const club = useLocalSearchParams("clubId");
  const clubId = club?.clubId;
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const style = {
    box: "h-[10vh] w-[28vw] justify-center items-center my-2 border rounded-md border-primary ",
    text: "font-psemibold text-center ",
    textmain: "font-pbold text-center text-primary mt-1  ",
  };
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const getClubStatistic = async () => {
    // get club statistic by clubId
    try {
      setIsLoading(true);
      const response = await getBillsByClubId(clubId);
      console.log(response);
      setData(response);
      setLength(response.length);
      setTotal(response.reduce((acc, cur) => acc + cur.price, 0));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClubStatistic();
  }, [clubId]);

  return (
    <>
      <ScrollView className="bg-white ">
        {/* {isLoading && (
          <View className="h-[90vh] justify-center">
            <ActivityIndicator size="large" color="#E12727" />
          </View>
        )} */}
        {/* {!isLoading && ( */}
        <View>
          <View className=" flex-row justify-around">
            <View className={`${style.box}`}>
              <Text className={`${style.text}`}>Đơn đặt bàn</Text>
              <Text className={`${style.textmain}`}>{length}</Text>
            </View>
            <View className={`${style.box}`}>
              <Text className={`${style.text}`}>Doanh thu</Text>
              <Text className={`${style.textmain}`}>
                {formatter.format(total)}{" "}
              </Text>
            </View>
            <View className={`${style.box}`}>
              <Text className={`${style.text}`}>Hoa hồng(5%)</Text>
              <Text className={`${style.textmain}`}>
                {formatter.format((total * 5) / 100)}{" "}
              </Text>
            </View>
          </View>
          <View>
            {data.map((item) => {
              return (
                <View
                  key={item.id}
                  className="mx-2 border p-2 my-1 flex-row justify-between rounded-2xl"
                >
                  <View className="w-[50%]">
                    <Text>Tên khách: {item.bookerName}</Text>
                    <Text>Số điện thoại: {item.bookerPhone}</Text>
                    <Text>
                      Ngày đặt: {moment(item.bookingDate).format("DD/MM/YYYY")}
                    </Text>
                    <Text>Tổng tiền: {formatter.format(item.price)}</Text>
                  </View>
                  <View className="w-[45%]">
                    <Text>
                      Phương thức: {item.paymentMethods === 0 && "Momo"}
                    </Text>
                    <Text
                      className={`${
                        item.status === "ACTIVE" && "text-green-600"
                      } ${item.status === "WAITING" && "text-orange-500"} ${
                        item.status === "INACTIVE" && "text-red-500"
                      } ${item.status === "DELETED" && "text-primary"}`}
                    >
                      Trạng thái:{" "}
                      {(item.status === "ACTIVE" && "Hoàn thành") ||
                        (item.status === "WAITING" && "Chờ xác nhận") ||
                        (item.status === "INACTIVE" && "Từ chối") ||
                        (item.status === "DELETED" && "Đã hủy")}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        {/* )} */}
      </ScrollView>
    </>
  );
};

export default ClubStatistic;
