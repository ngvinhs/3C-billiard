import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useState, useEffect } from "react";
import {
  getAllNotifications,
  getNotificationsByUserId,
} from "../../lib/action/notification";
import { useGlobalContext } from "../../context/GlobalProvider";
import NotiCard from "../../components/notification/NotiCard";

const Notification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ notificates: [] });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getNotificationsByUserId(user.userid);
      const sortedData = res.notificates
        .sort((a, b) => b.id - a.id)
        .filter((item) => item.title !== "Bill Image Updated");
      setData({ notificates: sortedData });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    fetchData().finally(() => setIsRefreshing(false));
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log("data: ", data);

  const { user } = useGlobalContext();
  // console.log("user: ", user);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {isLoading && !isRefreshing && (
        <View className="h-[100vh] items-center justify-center">
          <ActivityIndicator size="large" color="#e12727" />
        </View>
      )}
      {!isLoading && data.length === 0 && (
        <View className="h-[70vh] items-center justify-center">
          <Text className="font-pmedium text-gray-500">
            Hiện tại vị trí bạn chưa có thông báo nào
          </Text>
          <Text className="font-pmedium text-gray-500">
            Hãy hãy trải nghiệm ứng dụng thôi!!
          </Text>
        </View>
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <View className="h-[100vh] bg-white"> */}

        <ScrollView
          className="bg-white h-[100vh]"
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading && !isRefreshing && (
            <View className="h-[90vh] justify-center items-center">
              <ActivityIndicator size="large" color="primary" />
            </View>
          )}

          {data.notificates.length === 0 && (
            <View className="h-[90vh] justify-center items-center">
              <Text className=" font-psemibold text-xl text-center">
                Bạn chưa có thông báo nào
              </Text>
            </View>
          )}

          {data.notificates.map((item, index) => (
            <NotiCard key={index} data={item} />
          ))}
        </ScrollView>
        {/* <FlatList className="bg-white h-[100vh]"
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Notifi data={item} />}
          /> */}
        {/* </View> */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Notification;
