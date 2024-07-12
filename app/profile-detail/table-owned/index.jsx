import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CardTable from "../../../components/clb/CardTable";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  deleteTableBida,
  getBidaTableById,
} from "../../../lib/action/bidaTable";

const TableOwned = ({}) => {
  //   const data = [];
  const [tableData, setTableData] = useState([]);
  const Club = useLocalSearchParams("clubId");
  const [isLoading, setIsLoading] = useState(false);

  const clubId = Club.clubId;

  const getBidaTableByClubId = async (id) => {
    try {
      setIsLoading(true);
      const response = await getBidaTableById(id);
      setTableData(response);
      console.log("tableData", response);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   getBidaTableByClubId(clubId);
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getBidaTableByClubId(clubId);
    }, [clubId])
  );

  const onDeleteTable = async (id) => {
    try {
      const response = await deleteTableBida(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      getBidaTableByClubId(clubId);
    }
  };

  const data = [
    {
      id: 1,
      name: "Bàn 1",
      type: "Bida Lỗ",
      price: "75000",
      image: require("../../../assets/clb_image.png"),
    },
    {
      id: 2,
      name: "Bàn 2",
      type: "3 bi",
      price: "69000",
      image: require("../../../assets/clb_image.png"),
    },
    {
      id: 3,
      name: "Bàn 3",
      type: "Bida Lỗ",
      price: "73000",
      image: require("../../../assets/clb_image.png"),
    },
  ];

  return (
    <ScrollView className="bg-white">
      <View className="items-center mt-2">
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/profile-detail/table-owned/create-table",
              params: { clubId: clubId },
            });
          }}
          className=" w-[90%] items-center mx-2 py-1 rounded-xl border-2 flex-row justify-center"
        >
          <Image
            className="w-6 h-6"
            source={require("../../../assets/tabler_table-plus.png")}
          />
          <Text> </Text>
          <Text className="font-pbold">Thêm bàn</Text>
        </TouchableOpacity>
        {/* {tableData.length == [] && (
          <View className="mt-28">
            <Image
              className="w-80 h-80"
              source={require("../../../assets/ticket-table.png")}
            />
            <Text className="text-center">
              Bạn chưa có bàn trong câu lạc bộ của chính mình!!
            </Text>
            <Text className="text-center">Thêm bàn phía trên</Text>
          </View>
        )} */}
        {isLoading == true && (
          <View className="flex-1 items-center justify-center h-[90vh]">
            <ActivityIndicator size="large" color="#e12727" />
          </View>
        )}

        {tableData.length === 0 && !isLoading && (
          <View className="mt-28">
            <Image
              className="w-80 h-80"
              source={require("../../../assets/ticket-table.png")}
            />
            <Text className="text-center">
              Bạn chưa có bàn trong câu lạc bộ của chính mình!!
            </Text>
            <Text className="text-center">Tạo bàn ngay thôi</Text>
          </View>
        )}
        {tableData
          .filter((item) => item.status !== "DELETED")
          .map((item) => {
            return (
              <CardTable
                deleteTable={() => {
                  onDeleteTable(item.id);
                }}
                key={item.id}
                data={item}
                bidaClubId={clubId}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

export default TableOwned;
