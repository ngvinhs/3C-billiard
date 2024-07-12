import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import DatePicker from "react-native-modern-datepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { getBidaTableById } from "../../lib/action/bidaTable";
import {
  getBidaTableSlot,
  getBidaTableSlotByDateAndTableId,
  getBidaTableSlotByTableId,
} from "../../lib/action/bidaTableSlot";
import { isLoading } from "expo-font";
import {
  bookingBidaSlot,
  clubOwnerBookingBidaSlot,
  deleteBooking,
} from "../../lib/action/booking";
import { useGlobalContext } from "../../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button";
import moment from "moment";

const Agenda = ({ onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [seventhDay, setSeventhDay] = useState(new Date());

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  useEffect(() => {
    const next7days = new Date();
    next7days.setDate(next7days.getDate() + 7);
    setSeventhDay(next7days);
  }, []);

  //make the format date

  //make the array from current date to seventh day
  const makeDateArray = (start, end) => {
    const arr = [];
    for (
      let dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  const dateArray = makeDateArray(currentDate, seventhDay);

  //format dateArray YY/MM/DD

  const formattedDateArray = dateArray.map((date) => {
    let year = date.getFullYear().toString().slice(-2); // get last two digits of year
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // get month and pad with 0 if necessary
    let day = ("0" + date.getDate()).slice(-2); // get day and pad with 0 if necessary
    return `${year}/${month}/${day}`;
  });

  useEffect(() => {
    setSelectedDate(formattedDateArray[0]);
  }, []);

  return (
    <View>
      <View className="my-2">
        <Text className="font-pmedium text-base text-center">
          {monthNames[currentMonth]} {currentYear}
        </Text>
      </View>
      <View className="items-center">
        <FlatList
          data={formattedDateArray}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`${
                selectedDate == item ? "bg-primary" : ""
              } rounded-full border p-2 m-1 w-10 h-10 justify-center items-center`}
              onPress={() => {
                setSelectedDate(item);
                onDateChange(item);
              }}
            >
              <Text
                className={`${
                  selectedDate == item ? "text-white" : ""
                } font-pmedium text-sm`}
              >
                {item.slice(6, 8)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const Table = ({ table, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      className="mx-2 items-center"
      onPress={() => {
        onPress(table);
      }}
    >
      <View style={{ opacity: isSelected ? 0.5 : 1 }}>
        <Image
          className="w-16 h-16 rounded-full"
          source={{ uri: table.image }}
        />
      </View>
      <Text
        className={`font-pbold text-base ${isSelected ? "text-gray-400" : ""}`}
      >
        {table.tableName}
      </Text>
      <Text
        className={`font-pbold  text-base ${
          isSelected ? "text-red-300" : "text-primary"
        }`}
      >
        {table.type}
      </Text>
    </TouchableOpacity>
  );
};

const AvailableTime = ({ data, table, setSelectedSlots, selectedSlots }) => {
  const isSelected = selectedSlots.some(
    (slot) => slot.table.id === table.id && slot.time.id === data.id
  );

  const handlePress = () => {
    if (!isSelected) {
      setSelectedSlots((prevSlots) => [...prevSlots, { table, time: data }]);
    } else {
      setSelectedSlots((prevSlots) =>
        prevSlots.filter(
          (slot) => slot.table.id !== table.id || slot.time.id !== data.id
        )
      );
    }
  };
  return (
    <View>
      {data.booked === false ? (
        <TouchableOpacity
          onPress={handlePress}
          className={`mx-2 my-2 items-center w-20 rounded-md border ${
            isSelected ? "border-red-500" : ""
          }`}
        >
          <View className={`${isSelected ? "" : ""} `}>
            <Text
              className={`font-pbold text-base ${isSelected && "text-primary"}`}
            >
              {data.slotStartTime.split(":").slice(0, 2).join(":")}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View className="mx-2 my-2 items-center w-20 rounded-md border border-gray-300">
          <Text className="font-pbold text-gray-300 text-base">
            {data.slotStartTime.split(":").slice(0, 2).join(":")}
          </Text>
        </View>
      )}
    </View>
  );
};

const CLBOwner = () => {
  const { id } = useLocalSearchParams("id");
  const { user } = useGlobalContext();
  const currentDate = new Date();
  //format date YY/MM/DD
  let year = currentDate.getFullYear().toString().slice(-2);
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let day = ("0" + currentDate.getDate()).slice(-2);
  const formattedCurrentDate = `${year}/${month}/${day}`;

  const [selectedDate, setSelectedDate] = useState(formattedCurrentDate);
  const [tableData, setTableData] = useState([]);
  const [time, setTime] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isSlotLoading, setIsSlotLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [totalVND, setTotalInVND] = useState(0);

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //format date YY/MM/DD

  const getBidaTable = async () => {
    try {
      setIsTableLoading(true);
      const response = await getBidaTableById(id);
      setTableData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    getBidaTable();
  }, []);

  const getSlot = async (id, date) => {
    console.log("dateeeee", date);
    //format selectedDate from DD/MM/YY to MM/DD/YY
    let parts = date.split("/");
    let formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
    console.log("Formatted date: ", formattedDate);

    try {
      setIsSlotLoading(true);
      const response = await getBidaTableSlotByDateAndTableId(
        formattedDate,
        id
      );
      // const response = await getBidaTableSlotByTableId(id);
      // const response = await getBidaTableSlot(id);
      setTime(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsSlotLoading(false);
    }
  };

  useEffect(() => {
    //format selectedDate from YY/MM/DD to DD/MM/YY
    const date = selectedDate.split("/").reverse().join("/");

    if (selectedTable) {
      getSlot(selectedTable.id, date);
    }
  }, [selectedTable, selectedDate]);

  useEffect(() => {
    setSelectedSlots([]);
  }, [selectedDate]);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const slotsByTable = selectedSlots.reduce((acc, slot) => {
    if (!acc[slot.table.tableName]) {
      acc[slot.table.tableName] = slot.table.price;
    } else {
      acc[slot.table.tableName] += slot.table.price;
    }
    return acc;
  }, {});

  const totalFee = selectedSlots.reduce(
    (total, slot) => total + Number(slot.table.price),
    0
  );
  const roundedTotalFee = totalFee.toFixed(2);

  useEffect(() => {
    setTotalInVND(totalFee);
  }, [totalFee]);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  function formatDate(selectedDate) {
    // Assuming selectedDate is in 'YY/MM/DD' format
    let parts = selectedDate.split("/");
    let formattedDate = new Date(`20${parts[0]}`, parts[1] - 1, parts[2]);

    // Get the day, month and year
    let day = formattedDate.getDate();
    let month = formattedDate.getMonth() + 1; // Months are zero based
    let year = formattedDate.getFullYear().toString().substr(-2); // Get last two digits of year

    // Pad single digit day and month with zero
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${month}/${day}/${year}`;
  }

  const handleBooking = async () => {
    const timeIds = selectedSlots.map((slot) => slot.time.id);
    await AsyncStorage.removeItem("@timeIds");
    await AsyncStorage.removeItem("@selectedSlots");
    await AsyncStorage.removeItem("@selectedDate");

    setIsLoading(true);

    try {
      if (selectedSlots.length === 0) {
        return;
      }

      // await AsyncStorage.setItem("@timeIds", JSON.stringify(timeIds));
      // await AsyncStorage.setItem(
      //   "@selectedSlots",
      //   JSON.stringify(selectedSlots)
      // );
      // await AsyncStorage.setItem("@selectedDate", JSON.stringify(selectedDate));

      //change the format of selectedDate from YY/MM/DD to DD/MM/YY
      const formattedDate = formatDate(selectedDate);

      const response = await clubOwnerBookingBidaSlot(
        user.userid,
        formattedDate,
        timeIds
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.back();
      Alert.alert("Đặt bàn thành công");
    }
  };

  const handleConfirm = async () => {
    // const timeIds = selectedSlots.map((slot) => slot.time.id);
    // try {
    //   if (selectedSlots.length === 0) {
    //     return;
    //   }
    //   await AsyncStorage.setItem("@timeIds", JSON.stringify(timeIds));
    //   await AsyncStorage.setItem(
    //     "@selectedSlots",
    //     JSON.stringify(selectedSlots)
    //   );
    //   await AsyncStorage.setItem("@selectedDate", JSON.stringify(selectedDate));
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   router.push("/booking-clb/confirm");
    // }
  };

  // const hanldeDelete = async (timeIds) => {
  //   const timeIds = selectedSlots.map((slot) => slot.time.id);
  //   await AsyncStorage.removeItem("@timeIds");
  //   await AsyncStorage.removeItem("@selectedSlots");
  //   await AsyncStorage.removeItem("@selectedDate");

  //   setIsLoading(true);
  //   try {
  //     const response = await deleteBooking(timeIds);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     router.back();
  //   }
  // }

  return (
    <ScrollView className=" bg-white">
      {isLoading && (
        <View className="w-[100%] h-[100%] bg-transparent flex-row justify-center items-center">
          <ActivityIndicator size="large" color="#E12727" />
        </View>
      )}
      <View className="">
        <Text className="font-pbold text-lg ml-2 mt-2">Chọn ngày</Text>
        <View className="shadow-sm">
          <Agenda onDateChange={onDateChange} />
        </View>

        <View className="border-t mx-4 border-gray-50"></View>
        <Text className="font-pbold text-base mx-2 my-2">Chọn bàn</Text>

        <ScrollView className="mx-2" horizontal>
          {isTableLoading && (
            <View className="w-[95vw]">
              <ActivityIndicator size="large" color="#E12727" />
            </View>
          )}
          {tableData
            ?.filter((item) => item.status !== "DELETED")
            .map((table) => (
              <Table
                key={table.id}
                table={table}
                onPress={() => setSelectedTable(table)}
                isSelected={table === selectedTable}
              />
            ))}
        </ScrollView>

        <View className="h-[45vh]">
          <Text className="mx-2 text-xl font-pbold">Chọn giờ</Text>
          <View className="flex-row flex-wrap my-4">
            {!selectedTable && (
              <View className="mx-2">
                <Text className="font-pmedium">
                  Chọn bàn để hiển thị các mốc thời gian trống của bàn đó
                </Text>
              </View>
            )}
            {isSlotLoading ? (
              <View className="flex-row justify-center items-center w-[100vw]">
                <ActivityIndicator size="large" color="#E12727" />
              </View>
            ) : (
              <View className="flex-row flex-wrap">
                {time
                  ?.filter((item) => {
                    // Chuyển đổi thời gian item và thời gian hiện tại thành dạng số
                    const itemTime = moment(
                      `${selectedDate} ${item.slotStartTime}`,
                      "YYYY-MM-DD HH:mm"
                    ).valueOf();
                    const currentTime = moment().valueOf();

                    // Chỉ hiển thị những item có thời gian sau thời điểm hiện tại
                    return itemTime > currentTime;
                  })
                  .map((item) => (
                    <AvailableTime
                      key={item.id}
                      data={item}
                      table={selectedTable}
                      style={{ width: "25%" }}
                      setSelectedSlots={setSelectedSlots}
                      selectedSlots={selectedSlots}
                    />
                  ))}
                {/* {time?.map((item) => (
                <AvailableTime
                  key={item.id}
                  data={item}
                  table={selectedTable}
                  style={{ width: "25%" }}
                  setSelectedSlots={setSelectedSlots}
                  selectedSlots={selectedSlots}
                />
              ))} */}
              </View>
            )}
          </View>
        </View>
        {/* <View className="border-t border-gray-100"></View> */}
        <View>
          {/* <View className="mx-2">
          <Text className="text-xl font-pbold">Thanh toán</Text>
          <View>
            {selectedSlots.length === 0 && (
              <View className="mt-2">
                <Text className="font-pmedium">
                  Chọn bàn và thời gian để hiển thị thông tin thanh toán
                </Text>
              </View>
            )}

            {Object.entries(slotsByTable).map(([tableName, total]) => (
              <View key={tableName} className="flex-row justify-between">
                <Text className="text-lg font-pregular">{tableName}</Text>
                <Text className="text-lg font-pregular">
                  {total.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View> */}
        </View>
        <View>
          {totalFee ? (
            <View className="w-[95vw] items-center fixed bottom-0 mx-2 mb-6">
              <Button
                title={"Xác nhận "}
                icon={
                  <FontAwesome5 name="calendar-alt" size={20} color="white" />
                }
                onSubmit={() => {
                  handleBooking();
                }}
              />
            </View>
          ) : (
            <View className=""></View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default CLBOwner;
